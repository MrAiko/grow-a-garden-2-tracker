-- Grow a Garden 2 Stock Scraper Script (Extreme-Optimized)
-- Run this script in a Roblox Executor (e.g. Wave, Synapse, Electron, Solara, etc.)

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")
local LocalPlayer = Players.LocalPlayer

-- ================= CONFIGURATION =================
local API_URL = "https://grow-a-garden-2-tracker.onrender.com/api/update-stock"
local API_PASSWORD = "mySuperSecretToken123"
local UPDATE_INTERVAL = 30       -- Fallback interval in seconds to update API
local POLL_INTERVAL = 2.0        -- Fast state poll interval; fruit data comes from FruitStock snapshot
local FRUIT_REQUEST_INTERVAL = 10 -- Fallback remote refresh interval if Snapshot event is missed
local DEBUG = false              -- Set to true only to diagnose scraper issues
local MOBILE_SAFE_MODE = UserInputService.TouchEnabled and not UserInputService.KeyboardEnabled
local DESTROY_WORLD_ASSETS = false -- Never destroy Workspace parts; game controllers need plant.Base etc.
-- =================================================

local PlayerGui = LocalPlayer:WaitForChild("PlayerGui")
local SharedModules = ReplicatedStorage:WaitForChild("SharedModules", 10)

-- ================== CLIENT OPTIMIZATION ==================
-- Aggressively reduce client CPU/GPU/RAM usage so the scraper runs with near-zero
-- overhead. All steps are wrapped in pcall so a failure never breaks scraping.
local function optimizeClient()
    local RunService = game:GetService("RunService")

    -- 1. Stop 3D world rendering entirely.
    -- Some mobile executors (Delta/Android) become unstable when 3D rendering
    -- is disabled or the whole Workspace is locally destroyed, so phones use a
    -- lighter optimization profile.
    if not MOBILE_SAFE_MODE then
        pcall(function() RunService:Set3dRenderingEnabled(false) end)
    end

    -- 2. Minimize lighting/shadow cost.
    pcall(function()
        local lighting = game:GetService("Lighting")
        lighting.GlobalShadows = false
        lighting.OutdoorAmbient = Color3.fromRGB(128, 128, 128)
    end)

    -- 3. Force lowest graphics quality.
    pcall(function()
        settings().Rendering.QualityLevel = Enum.QualityLevel.Level01
        settings().Rendering.MeshPartDetailLevel = Enum.MeshPartDetailLevel.Level01
    end)

    -- 4. Move the camera far away so almost everything is frustum-culled.
    if not MOBILE_SAFE_MODE then
        pcall(function()
            local cam = workspace.CurrentCamera
            if cam then
                cam.CameraType = Enum.CameraType.Scriptable
                cam.CFrame = CFrame.new(0, 500000, 0)
            end
        end)
    end

    -- 5. Hide all CoreGui (chat, backpack, playerlist, ...).
    pcall(function()
        game:GetService("StarterGui"):SetCoreGuiEnabled(Enum.CoreGuiType.All, false)
    end)

    -- 6. Mute all sounds.
    pcall(function()
        game:GetService("SoundService").AmbientReverb = Enum.ReverbType.NoReverb
        for _, sound in ipairs(game:GetDescendants()) do
            if sound:IsA("Sound") then
                sound:Stop()
                sound.Volume = 0
            end
        end
        game.DescendantAdded:Connect(function(desc)
            if desc:IsA("Sound") then
                desc:Stop()
                desc.Volume = 0
            end
        end)
    end)

    -- 7. Optional destructive cleanup. Keep disabled by default: several game
    --    controllers still read Workspace.Gardens.*.Plants.*.Base on the client.
    local function cleanInstance(instance)
        if not instance then return end
        if instance:IsA("Camera") or instance:IsA("Terrain") then return end
        if LocalPlayer and LocalPlayer.Character and (instance == LocalPlayer.Character or instance:IsDescendantOf(LocalPlayer.Character)) then
            return
        end
        -- Destroy other players' characters locally.
        local player = Players:GetPlayerFromCharacter(instance)
        if player and player ~= LocalPlayer then
            task.defer(function() pcall(function() instance:Destroy() end) end)
            return
        end
        -- Walk up the parent chain; if any ancestor is a moon/eclipse asset, keep it.
        local current = instance
        while current and current ~= workspace do
            local nameLower = string.lower(current.Name)
            if string.find(nameLower, "moon") or string.find(nameLower, "blood")
               or string.find(nameLower, "gold") or string.find(nameLower, "eclipse") then
                return
            end
            current = current.Parent
        end
        if instance:IsA("BasePart") or instance:IsA("Decal") or instance:IsA("Texture")
           or instance:IsA("SpecialMesh") or instance:IsA("ParticleEmitter")
           or instance:IsA("Beam") or instance:IsA("Trail") or instance:IsA("PostEffect") then
            task.defer(function() pcall(function() instance:Destroy() end) end)
        end
    end

    if DESTROY_WORLD_ASSETS and not MOBILE_SAFE_MODE then
        pcall(function()
            workspace.Terrain:Clear()
            for _, desc in ipairs(workspace:GetDescendants()) do cleanInstance(desc) end
        end)
        workspace.DescendantAdded:Connect(cleanInstance)
    end

    -- 8. Black overlay indicating optimization mode (no brand text).
    task.spawn(function()
        pcall(function()
            local pGui = LocalPlayer:WaitForChild("PlayerGui", 15)
            if not pGui then return end
            local existing = pGui:FindFirstChild("OptimizerOverlay")
            if existing then existing:Destroy() end

            local sg = Instance.new("ScreenGui")
            sg.Name = "OptimizerOverlay"
            sg.IgnoreGuiInset = true
            sg.DisplayOrder = 999999
            sg.ResetOnSpawn = false

            local frame = Instance.new("Frame")
            frame.Size = UDim2.new(1, 0, 1, 0)
            frame.BackgroundColor3 = Color3.fromRGB(10, 10, 10)
            frame.BorderSizePixel = 0
            frame.Parent = sg

            local content = Instance.new("Frame")
            content.Size = UDim2.new(0, 420, 0, 170)
            content.Position = UDim2.new(0.5, -210, 0.5, -85)
            content.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
            content.BorderSizePixel = 0
            content.Parent = frame

            local corner = Instance.new("UICorner")
            corner.CornerRadius = UDim.new(0, 8)
            corner.Parent = content

            local stroke = Instance.new("UIStroke")
            stroke.Color = Color3.fromRGB(0, 170, 255)
            stroke.Thickness = 1.5
            stroke.Parent = content

            local status = Instance.new("TextLabel")
            status.Size = UDim2.new(1, -20, 1, -20)
            status.Position = UDim2.new(0, 10, 0, 10)
            status.BackgroundTransparency = 1
            status.TextColor3 = Color3.fromRGB(220, 220, 220)
            status.Font = Enum.Font.SourceSans
            status.TextSize = 16
            status.TextWrapped = true
            status.TextYAlignment = Enum.TextYAlignment.Top
            status.Text = "⚙️ Optimization: EXTREME (Void Mode)\n\n" ..
                          "Monitoring stock, weather, moon phases and fruit multipliers in the background...\n\n" ..
                          "Active & Connected"
            status.Parent = content

            sg.Parent = pGui
        end)
    end)
end

-- ================== NAME HELPERS ==================
local function formatCamelCase(str)
    if not str then return nil end
    return (str:gsub("(%l)(%u)", "%1 %2"))
end

local function cleanPhaseName(name)
    local formatted = formatCamelCase(name)
    if formatted == "Night" then return "Moon" end
    return formatted
end

local function normalizeName(name)
    return string.lower(tostring(name or "")):gsub("[^%w]", "")
end

local function isTechnicalPhaseName(name)
    local key = normalizeName(name)
    return key == "" or string.find(key, "websocket") or string.find(key, "remote")
        or string.find(key, "controller") or string.find(key, "module")
        or string.find(key, "request") or string.find(key, "response")
        or string.find(key, "snapshot") or string.find(key, "event")
end

local WEATHER_STATE_NAMES = {
    rain = "Rain", raining = "Rain", rainy = "Rain",
    starfall = "Starfall",
    snowfall = "Snowfall", snow = "Snowfall",
    rainbow = "Rainbow",
    thunderstorm = "Thunderstorm", lightning = "Thunderstorm",
    aurora = "Aurora", auroraborealis = "Aurora",
    sunburst = "Sunburst"
}

local function cleanWeatherStateName(name)
    local key = normalizeName(name)
    return WEATHER_STATE_NAMES[key]
end

local function isKnownWeatherStateName(name)
    return cleanWeatherStateName(name) ~= nil
end

local DECORATIVE_WEATHER_NAMES = {
    background = true, bg = true, frame = true, shadow = true, glow = true,
    border = true, gradient = true, uigradient = true, uistroke = true,
    uicorner = true, overlay = true, shine = true, bevel = true,
    beveleffect = true, image = true, icon = true,
    vector = true, thumbnail = true, timer = true, time = true, clock = true,
    label = true, text = true, textlabel = true, title = true, container = true,
    content = true, main = true, mainframe = true
}

local function isDecorativeWeatherCatalogName(name)
    local key = normalizeName(name)
    if DECORATIVE_WEATHER_NAMES[key] then return true end
    return string.find(key, "background")
        or string.find(key, "gradient") or string.find(key, "shadow")
        or string.find(key, "bevel") or string.find(key, "overlay")
end

local function findChildByNormalizedName(parent, names)
    if not parent then return nil end
    for _, targetName in ipairs(names) do
        local exact = parent:FindFirstChild(targetName)
        if exact then return exact end
    end
    local targets = {}
    for _, targetName in ipairs(names) do
        targets[normalizeName(targetName)] = true
    end
    for _, child in ipairs(parent:GetChildren()) do
        if targets[normalizeName(child.Name)] then
            return child
        end
    end
    return nil
end

local FALLBACK_PHASE_NAMES = {
    "Bloodmoon", "Goldmoon", "Chainedmoon", "Chained Moon", "Pizza Moon",
    "Rainbow Moon", "Solar Eclipse", "Mega Moon", "MegaMoon", "Megamoon", "Moon", "Night", "Sunset", "Day"
}

local cachedTimeCycle = nil

local function findTimeCycleController()
    if cachedTimeCycle and cachedTimeCycle.Parent and findChildByNormalizedName(cachedTimeCycle, { "Phases", "phases" }) then
        return cachedTimeCycle
    end
    local playerScripts = LocalPlayer:FindFirstChild("PlayerScripts")
    if playerScripts then
        local controllers = findChildByNormalizedName(playerScripts, { "Controllers", "controllers" })
        if controllers then
            local tc = findChildByNormalizedName(controllers, { "TimeCycleController", "timecyclecontroller", "Time Cycle Controller" })
            if tc then
                cachedTimeCycle = tc
                return tc
            end
        end
    end
    return nil
end

local function getPhasesFolder()
    local tc = findTimeCycleController()
    return tc and findChildByNormalizedName(tc, { "Phases", "phases" }) or nil
end

local function getKnownPhaseNames()
    local names, seen = {}, {}
    local function add(name)
        if not name or name == "" then return end
        if isTechnicalPhaseName(name) then return end
        if isDecorativeWeatherCatalogName(name) then return end
        local key = normalizeName(name)
        if key ~= "" and not seen[key] then
            seen[key] = true
            table.insert(names, name)
        end
    end
    local phases = getPhasesFolder()
    if phases then
        for _, child in ipairs(phases:GetChildren()) do
            add(child.Name)
            add(formatCamelCase(child.Name))
        end
    end
    for _, name in ipairs(FALLBACK_PHASE_NAMES) do add(name) end
    return names
end

local function isDefaultPhaseName(name)
    local key = normalizeName(name)
    return key == "day" or key == "sunset" or key == "moon" or key == "night"
end

local DECORATION_SUFFIXES = {
    "beams", "beam", "particles", "particle", "particlesemitter",
    "effect", "effects", "light", "lights", "glow", "glows",
    "aura", "auras", "fx", "visual", "visuals", "emitter", "emitters",
    "vfx", "ray", "rays", "mesh", "meshes", "model", "models",
    "trail", "trails", "sparkles", "sparkle", "smoke", "fire",
    "attachment", "attachments", "decal", "decals", "billboard", "billboardgui",
}

local function isDecorationAsset(instanceKey, phaseKey)
    if #instanceKey <= #phaseKey then return false end
    if string.sub(instanceKey, 1, #phaseKey) ~= phaseKey then return false end
    local rest = string.sub(instanceKey, #phaseKey + 1)
    for _, suffix in ipairs(DECORATION_SUFFIXES) do
        if rest == suffix then return true end
    end
    return false
end

local function findActivePhaseAsset(container, specialOnly)
    if not container then return nil end
    local instances = {}
    for _, child in ipairs(container:GetChildren()) do
        table.insert(instances, child)
        if (child:IsA("Folder") or child:IsA("Model")) and child.Name ~= "Terrain" then
            if not (game.Players and game.Players:GetPlayerFromCharacter(child)) then
                for _, subChild in ipairs(child:GetChildren()) do
                    table.insert(instances, subChild)
                end
            end
        end
    end
    local phaseNames = getKnownPhaseNames()
    for _, phaseName in ipairs(phaseNames) do
        if not specialOnly or not isDefaultPhaseName(phaseName) then
            local phaseKey = normalizeName(phaseName)
            local cleanKey = normalizeName(cleanPhaseName(phaseName))
            for _, instance in ipairs(instances) do
                local instanceKey = normalizeName(instance.Name)
                if not (isDecorationAsset(instanceKey, phaseKey) or isDecorationAsset(instanceKey, cleanKey)) then
                    if instanceKey == phaseKey or instanceKey == cleanKey
                       or instanceKey == "active" .. phaseKey or instanceKey == "active" .. cleanKey then
                        return cleanPhaseName(phaseName)
                    end
                end
            end
        end
    end
    return nil
end

-- ================== HTTP ==================
local function addHttpCandidate(list, fn)
    if type(fn) == "function" then
        for _, existing in ipairs(list) do
            if existing == fn then return end
        end
        table.insert(list, fn)
    end
end

local function getExecutorHttpCandidates()
    local list = {}
    addHttpCandidate(list, request)
    addHttpCandidate(list, http_request)
    addHttpCandidate(list, syn and syn.request)
    addHttpCandidate(list, http and http.request)
    addHttpCandidate(list, fluxus and fluxus.request)
    addHttpCandidate(list, krnl and krnl.request)
    addHttpCandidate(list, delta and delta.request)
    addHttpCandidate(list, Delta and Delta.request)

    local ok, env = pcall(function()
        return getgenv and getgenv() or nil
    end)
    if ok and type(env) == "table" then
        addHttpCandidate(list, env.request)
        addHttpCandidate(list, env.http_request)
        addHttpCandidate(list, env.syn and env.syn.request)
        addHttpCandidate(list, env.http and env.http.request)
        addHttpCandidate(list, env.fluxus and env.fluxus.request)
        addHttpCandidate(list, env.krnl and env.krnl.request)
        addHttpCandidate(list, env.delta and env.delta.request)
        addHttpCandidate(list, env.Delta and env.Delta.request)
    end

    return list
end

local function normalizeHttpResult(response)
    if type(response) == "table" then
        local status = response.StatusCode or response.Status or response.status or response.status_code or response.code
        local body = response.Body or response.body or response.Response or response.response or response.Data or response.data or ""
        status = tonumber(status)
        if not status or (status >= 200 and status < 300) then
            return true, body
        end
        return false, "HTTP " .. tostring(status) .. ": " .. tostring(body)
    end
    if type(response) == "string" then
        return true, response
    end
    if response == true then
        return true, ""
    end
    return false, "no response"
end

local function makeHttpRequest(url, method, headers, body)
    local lastErr = nil
    for _, requestFunc in ipairs(getExecutorHttpCandidates()) do
        local payloads = {
            { Url = url, Method = method, Headers = headers, Body = body },
            { url = url, method = method, headers = headers, body = body },
        }
        for _, payload in ipairs(payloads) do
            local ok, response = pcall(function()
                return requestFunc(payload)
            end)
            if ok then
                local success, result = normalizeHttpResult(response)
                if success then
                    return true, result
                end
                lastErr = result
            else
                lastErr = response
            end
        end
    end

    local requestAsyncOk, requestAsyncResult = pcall(function()
        return HttpService:RequestAsync({
            Url = url,
            Method = method,
            Headers = headers,
            Body = body
        })
    end)
    if requestAsyncOk then
        local success, result = normalizeHttpResult(requestAsyncResult)
        if success then
            return true, result
        end
        lastErr = result
    else
        lastErr = requestAsyncResult
    end

    local success, res = pcall(function()
        return HttpService:PostAsync(url, body, Enum.HttpContentType.ApplicationJson, false, headers)
    end)
    if success then
        return true, res
    end
    lastErr = res

    local gamePostOk, gamePostResult = pcall(function()
        return game:HttpPost(url, body, Enum.HttpContentType.ApplicationJson, false, headers)
    end)
    if gamePostOk then
        return true, gamePostResult
    end
    lastErr = gamePostResult

    return false, tostring(lastErr or "no supported HTTP request function")
end

-- ================== WEBSOCKET CLIENT ==================
local wsConnection = nil
local isWsConnecting = false

local function getWebSocketClient()
    if wsConnection then return wsConnection end
    if isWsConnecting then return nil end
    
    local wsConnectFunc = WebSocket and WebSocket.connect or (syn and syn.websocket and syn.websocket.connect)
    if not wsConnectFunc then
        return nil
    end
    
    isWsConnecting = true
    task.spawn(function()
        local wsUrl = API_URL:gsub("https://", "wss://"):gsub("http://", "ws://")
        if wsUrl:sub(-10) == "/api/stock" then
            wsUrl = wsUrl:sub(1, -11)
        elseif wsUrl:sub(-11) == "/api/stock/" then
            wsUrl = wsUrl:sub(1, -12)
        end
        
        if DEBUG then
            print("[Grow a Garden 2 Stocker] Connecting WebSocket to: " .. wsUrl)
        end
        
        local success, ws = pcall(function()
            return wsConnectFunc(wsUrl)
        end)
        
        isWsConnecting = false
        if success and ws then
            if DEBUG then
                print("[Grow a Garden 2 Stocker] WebSocket connected successfully!")
            end
            wsConnection = ws
            
            local onMessage = ws.OnMessage or ws.on_message
            local onClose = ws.OnClose or ws.on_close
            
            if onClose then
                onClose:Connect(function()
                    if DEBUG then
                        print("[Grow a Garden 2 Stocker] WebSocket closed.")
                    end
                    wsConnection = nil
                end)
            end
            
            if onMessage then
                onMessage:Connect(function(msg)
                    if DEBUG then
                        print("[Grow a Garden 2 Stocker] WebSocket msg: " .. tostring(msg))
                    end
                end)
            end
        else
            warn("[Grow a Garden 2 Stocker] WebSocket connection failed: " .. tostring(ws))
        end
    end)
    
    return wsConnection
end


-- ================== RESTOCK TIMES ==================
local function getRestockTimes()
    local times = {
        CrateShop = { last = 0, next = 0 },
        GearShop = { last = 0, next = 0 },
        SeedShop = { last = 0, next = 0 }
    }
    local StockValues = ReplicatedStorage:FindFirstChild("StockValues")
    if StockValues then
        for _, shopFolder in ipairs(StockValues:GetChildren()) do
            if times[shopFolder.Name] then
                local lastVal, nextVal = shopFolder:FindFirstChild("UnixLastRestock"), shopFolder:FindFirstChild("UnixNextRestock")
                if lastVal then
                    local ok, ret = pcall(function() return lastVal.Value end)
                    if ok and type(ret) == "number" then times[shopFolder.Name].last = ret end
                end
                if nextVal then
                    local ok, ret = pcall(function() return nextVal.Value end)
                    if ok and type(ret) == "number" then times[shopFolder.Name].next = ret end
                end
            end
        end
    end
    return times
end

-- ================== ITEM PARSING ==================
local RARITY_NAMES = {
    common = "Common", uncommon = "Uncommon", rare = "Rare", epic = "Epic",
    legendary = "Legendary", secret = "Secret", exotic = "Exotic", super = "Super",
    mythic = "Mythic", divine = "Divine", prismatic = "Prismatic", transendent = "Transendent"
}

local GENERIC_ITEM_NAMES = {
    frame = true, main_frame = true, template = true, itemtemplate = true,
    itemframe = true, generateitems = true, item_size = true, new_frame = true,
    uilistlayout = true, uigridlayout = true, uipadding = true, uistroke = true,
    uigradient = true, uicorner = true, viewportframe = true, imagedisplay = true,
    rarity = true, rarity_text = true, cost_text = true, stock_text = true,
    seed_text = true, name = true, textlabel = true, textbutton = true,
    shadow = true, beveleffect = true, sunburst = true, vector = true,
    inlettexture = true, buttons = true, fruitcard = true, scrollingframe = true,
    fruitstockprice = true, normalshop = true, normal = true, header = true,
    fruits = true, fruit = true, seeds = true, seed = true, crops = true, crop = true,
    items = true, item = true, assets = true, asset = true, textures = true, texture = true,
    images = true, image = true, icons = true, icon = true, models = true, model = true,
    products = true, product = true, plants = true, plant = true, vegetables = true, vegetable = true,
    flowers = true, flower = true, deals = true, deal = true, shop = true, inventory = true,
    backpack = true, character = true
}

local function isTechnicalItem(name)
    local ln = string.lower(name)
    return ln == "itemtemplate" or ln == "template" or ln == "padding" or ln == "uipadting"
        or ln == "uipadding" or ln == "robux_shelf" or ln == "sheckles_shelf" or ln == "shackles_shelf"
        or ln == "buttons" or string.find(ln, "padding") or string.find(ln, "template")
        or string.find(ln, "shelf") or string.find(ln, "layout")
end

local function isGenericItemName(name)
    if not name or name == "" then return true end
    local ln = string.lower(name)
    if GENERIC_ITEM_NAMES[ln] then return true end
    if ln:match("^itemframe_") or ln:match("^activedeal_") or ln:match("^item_%d+") then return true end
    return isTechnicalItem(name)
end

local function detectRarity(itemRoot)
    local rarityFrame = itemRoot:FindFirstChild("Rarity", true)
    if rarityFrame then
        for _, c in ipairs(rarityFrame:GetChildren()) do
            local r = RARITY_NAMES[string.lower(c.Name)]
            if r then return r end
        end
    end
    local rarityText = itemRoot:FindFirstChild("Rarity_Text", true)
    if rarityText and rarityText:IsA("TextLabel") then
        local t = string.lower(rarityText.Text or "")
        for kw, val in pairs(RARITY_NAMES) do
            if string.find(t, kw) then return val end
        end
    end
    return "Common"
end

-- Image element names that represent the ACTUAL item icon, in priority order.
local ITEM_ICON_NAMES = { "imagedisplay", "vector", "icon", "thumbnail", "itemimage", "fruitvector" }
-- Image element names that are decorative chrome (background, bevel, glow, shadow)
-- and must NEVER be picked as the item image. They share one asset id across all
-- cards, which is why every item previously got the same wrong picture.
local DECORATIVE_IMAGE_NAMES = {
    beveleffect = true, sunburst = true, shadow = true, frame = true,
    background = true, bg = true, border = true, gradient = true,
    uigradient = true, uistroke = true, uicorner = true, glow = true,
    shine = true, overlay = true, rarity = true, main_frame = true,
}

local function detectImage(itemRoot)
    -- Pass 1: prefer ImageLabels/ImageButtons whose Name marks them as the item icon.
    -- This is the correct icon (ImageDisplay / Vector in the new card layout).
    for _, desc in ipairs(itemRoot:GetDescendants()) do
        if desc:IsA("ImageLabel") or desc:IsA("ImageButton") then
            local dn = string.lower(desc.Name)
            local isIcon = false
            for _, icon in ipairs(ITEM_ICON_NAMES) do
                if dn == icon then isIcon = true; break end
            end
            if isIcon then
                local img = desc.Image or ""
                local assetId = string.match(img, "%d+")
                if assetId and assetId ~= "112886786873408" then
                    return assetId
                end
            end
        end
    end

    -- Pass 2: fall back to any ImageLabel that is NOT a known decorative element.
    -- This avoids returning the shared card-chrome image for every item.
    for _, desc in ipairs(itemRoot:GetDescendants()) do
        if desc:IsA("ImageLabel") or desc:IsA("ImageButton") then
            local dn = string.lower(desc.Name)
            if not DECORATIVE_IMAGE_NAMES[dn] then
                local img = desc.Image or ""
                local assetId = string.match(img, "%d+")
                if assetId and assetId ~= "112886786873408" then
                    return assetId
                end
            end
        end
    end
    return nil
end

local function getNestedText(itemRoot, containerName)
    local container = itemRoot:FindFirstChild(containerName, true)
    if not container then return nil end
    if container:IsA("TextLabel") and container.Text and container.Text ~= "" then
        return container.Text
    end
    for _, desc in ipairs(container:GetDescendants()) do
        if desc:IsA("TextLabel") and desc.Text and desc.Text ~= "" then
            return desc.Text
        end
    end
    return nil
end

local function scrapeShop(container)
    local items = {}
    if not container then return items end
    for _, desc in ipairs(container:GetDescendants()) do
        if desc:IsA("GuiObject") and not isGenericItemName(desc.Name) then
            local mainFrame = desc:FindFirstChild("Main_Frame")
            local contentRoot = mainFrame or desc
            local hasFields = contentRoot:FindFirstChild("Cost_Text", true)
                or contentRoot:FindFirstChild("Stock_Text", true)
                or contentRoot:FindFirstChild("Seed_Text", true)
                or contentRoot:FindFirstChild("Rarity", true)
            if mainFrame or hasFields then
                local stockVal = 0
                local priceVal = getNestedText(contentRoot, "Cost_Text") or "Unknown"
                local stockText = getNestedText(contentRoot, "Stock_Text") or getNestedText(contentRoot, "Seed_Text")
                if stockText then
                    local lt = string.lower(stockText)
                    if string.find(lt, "no stock") or stockText == "" then
                        stockVal = 0
                    else
                        local parsed = string.match(stockText, "(%d+)")
                        if parsed then stockVal = tonumber(parsed) end
                    end
                end
                local noStock = contentRoot:FindFirstChild("NoStock", true)
                if noStock and noStock:IsA("GuiObject") and noStock.Visible == true then
                    stockVal = 0
                end
                table.insert(items, {
                    name = desc.Name,
                    stock = stockVal,
                    price = priceVal,
                    rarity = detectRarity(contentRoot),
                    image = detectImage(contentRoot)
                })
            end
        end
    end
    return items
end

local function scrapeShopSafe(container)
    local success, items = pcall(function() return scrapeShop(container) end)
    return success and items or {}
end

-- ================== WEATHER / PHASE ==================
local function getDefaultPhase()
    local clock = game.Lighting.ClockTime
    if clock >= 17 and clock < 19.5 then return "Sunset"
    elseif clock >= 6 and clock < 17 then return "Day"
    else return "Moon" end
end

local function isNightPhase(phaseName)
    local lower = string.lower(phaseName)
    return lower ~= "day" and lower ~= "sunset"
end

local function isInstanceVisible(instance)
    local p = instance
    while p and p ~= PlayerGui do
        if p:IsA("GuiObject") and p.Visible == false then return false end
        p = p.Parent
    end
    return true
end

local function hasTruthyAttribute(instance, names)
    if not instance then return false end
    for _, attrName in ipairs(names) do
        local ok, value = pcall(function() return instance:GetAttribute(attrName) end)
        if ok then
            if value == true then return true end
            if type(value) == "string" and string.lower(value) == "true" then return true end
            if type(value) == "number" and value > 0 then return true end
        end
    end
    return false
end

local function isWeatherCardActive(card)
    if not card or not card:IsA("GuiObject") then return false end
    if isInstanceVisible(card) then return true end
    if hasTruthyAttribute(card, { "Playing", "Active", "IsActive", "Enabled", "playing", "active" }) then
        return true
    end
    for _, desc in ipairs(card:GetDescendants()) do
        if hasTruthyAttribute(desc, { "Playing", "Active", "IsActive", "Enabled", "playing", "active" }) then
            return true
        end
        if desc:IsA("TextLabel") then
            local text = string.lower(tostring(desc.Text or ""))
            if text ~= "" and (string.find(text, "%d+:%d+") or string.find(text, "start") or string.find(text, "нач")) then
                return true
            end
        end
    end
    return false
end

local function parseTimeToSeconds(timeStr)
    if not timeStr or timeStr == "" then return 0 end
    local cleanStr = string.match(timeStr, "(%d+:%d+)") or timeStr
    local m, s = string.match(cleanStr, "(%d+):(%d+)")
    if m and s then return tonumber(m) * 60 + tonumber(s) end
    local minutes = string.match(cleanStr, "(%d+)m")
    local seconds = string.match(cleanStr, "(%d+)s")
    local total = 0
    if minutes then total = total + tonumber(minutes) * 60 end
    if seconds then total = total + tonumber(seconds) end
    if total == 0 and tonumber(cleanStr) then total = tonumber(cleanStr) end
    return total
end

local function getActiveTimerText()
    local weatherUI = PlayerGui:FindFirstChild("WeatherUI")
    if not weatherUI then return nil end
    local frame = weatherUI:FindFirstChild("Frame")
    if frame then
        for _, child in ipairs(frame:GetChildren()) do
            if child:IsA("GuiObject") and isWeatherCardActive(child) then
                for _, sub in ipairs(child:GetDescendants()) do
                    if sub:IsA("TextLabel") and isInstanceVisible(sub) and sub.Text ~= "" then
                        local sn = string.lower(sub.Name)
                        if string.find(sn, "time") or string.find(sn, "timer") or string.find(sn, "clock") then
                            return sub.Text
                        end
                    end
                end
                for _, sub in ipairs(child:GetDescendants()) do
                    if sub:IsA("TextLabel") and isInstanceVisible(sub) and sub.Text ~= "" then
                        local tc = string.match(sub.Text, "^%s*(.-)%s*$")
                        if string.match(tc, "%d+:%d+") or string.match(tc, "%d+m %d+s")
                           or string.match(tc, "%d+m") or string.match(tc, "%d+s") then
                            return tc
                        end
                    end
                end
            end
        end
    end
    for _, desc in ipairs(weatherUI:GetDescendants()) do
        if desc:IsA("TextLabel") and isInstanceVisible(desc) and desc.Text ~= "" then
            local tc = string.match(desc.Text, "^%s*(.-)%s*$")
            if string.match(tc, "%d+:%d+") or string.match(tc, "%d+m %d+s")
               or string.match(tc, "%d+m") or string.match(tc, "%d+s") then
                return tc
            end
        end
    end
    return nil
end

local function findImageId(instance, expectedName)
    if not instance then return nil end
    local expectedKey = normalizeName(expectedName or instance.Name or "")

    local function extractId(str)
        if not str or str == "" then return nil end
        str = tostring(str)
        if string.sub(str, 1, 4) == "http" then return str end
        if string.sub(str, 1, 1) == "/" then return str end
        -- Match id= digits first (e.g. for rbxthumb URL)
        local id = string.match(str, "[iI][dD]=(%d+)")
        if id and id ~= "0" and id ~= "112886786873408" then return id end
        id = string.match(str, "rbxassetid://(%d+)")
        if id and id ~= "0" and id ~= "112886786873408" then return id end
        -- Match raw digits
        id = string.match(str, "%d+")
        if id and id ~= "0" and id ~= "112886786873408" then return id end
        return nil
    end

    local imageAttributes = {
        "Image", "ImageId", "ImageID", "Icon", "IconId", "IconID",
        "Texture", "TextureId", "TextureID", "Asset", "AssetId", "AssetID"
    }

    local decorativeNames = {
        background = true, bg = true, frame = true, shadow = true, glow = true,
        border = true, gradient = true, uigradient = true, uistroke = true,
        uicorner = true, overlay = true, shine = true, bevel = true,
        beveleffect = true
    }

    local preferredNames = {
        icon = true, image = true, imageicon = true, imagedisplay = true,
        vector = true, weathericon = true, phaseicon = true, thumbnail = true,
        logo = true, sprite = true
    }

    local function matchesExpectedIconName(name)
        if expectedKey == "" then return false end
        local key = normalizeName(name)
        if expectedKey == "rain" then
            return key == "rain" or key == "raining" or key == "rainy"
                or key == "rainicon" or key == "rainimage" or key == "rainvector"
                or string.find(key, "raindrop") ~= nil
        end
        return key == expectedKey
            or key == expectedKey .. "icon"
            or key == expectedKey .. "image"
            or key == expectedKey .. "vector"
            or ((string.find(key, expectedKey) ~= nil) and (string.find(key, "icon") ~= nil or string.find(key, "image") ~= nil or string.find(key, "vector") ~= nil))
    end

    local function ancestorMatchesExpected(inst)
        if expectedKey == "" then return false end
        local cur, depth = inst, 0
        while cur and depth < 6 do
            if matchesExpectedIconName(cur.Name) then
                return true
            end
            cur = cur.Parent
            depth = depth + 1
        end
        return false
    end

    local function imageFrom(inst)
        if not inst then return nil end
        for _, attrName in ipairs(imageAttributes) do
            local ok, attrValue = pcall(function() return inst:GetAttribute(attrName) end)
            if ok then
                local attrId = extractId(attrValue)
                if attrId then return attrId end
            end
        end
        if inst:IsA("StringValue") or inst:IsA("ObjectValue") then
            local valueId = extractId(inst.Value)
            if valueId then return valueId end
        elseif inst:IsA("IntValue") or inst:IsA("NumberValue") then
            local valueId = extractId(inst.Value)
            if valueId then return valueId end
        end
        if (inst:IsA("ImageLabel") or inst:IsA("ImageButton")) and inst.Image ~= "" then
            return extractId(inst.Image)
        end
        if inst:IsA("Decal") or inst:IsA("Texture") then
            return extractId(inst.Texture)
        end
        if inst:IsA("MeshPart") and inst.TextureID ~= "" then
            return extractId(inst.TextureID)
        end
        if (inst:IsA("SpecialMesh") or inst:IsA("FileMesh")) and inst.TextureId ~= "" then
            return extractId(inst.TextureId)
        end
        return nil
    end

    -- Weather UI cards store the real icon at Frame.<WeatherName>.Vector.
    -- Read it before scanning descendants, so Rain/Snowfall don't pick effects.
    local vector = findChildByNormalizedName(instance, { "Vector" })
    local vectorId = imageFrom(vector)
    if vectorId then return vectorId end

    local direct = imageFrom(instance)
    local rootName = normalizeName(instance.Name)
    if direct and (expectedKey == "" or preferredNames[rootName] or matchesExpectedIconName(instance.Name)) then
        return direct
    end

    local fallback = nil
    for _, desc in ipairs(instance:GetDescendants()) do
        local id = imageFrom(desc)
        if id then
            local dn = normalizeName(desc.Name)
            if matchesExpectedIconName(desc.Name) and not decorativeNames[dn] then
                return id
            end
            if preferredNames[dn] and (expectedKey == "" or ancestorMatchesExpected(desc)) then
                return id
            end
            if expectedKey == "" and not fallback and not decorativeNames[dn] then
                fallback = id
            end
        end
    end

    if fallback then return fallback end
    if expectedKey == "" and direct then return direct end
    return nil
end

local function isWeatherPhaseName(name)
    if isTechnicalPhaseName(name) then return false end
    local key = normalizeName(name)
    return (key == "night" or key == "day" or key == "sunset")
        or string.find(key, "moon") or string.find(key, "eclipse")
        or key == "blood" or key == "gold" or key == "chained"
        or key == "pizza" or key == "solar" or key == "mega"
end

local weatherCatalogCache = {}
local WEATHER_CATALOG_RESCAN_INTERVAL = 120
local WEATHER_CATALOG_SCAN_LIMIT = 5000
local weatherCatalogCacheAt = -WEATHER_CATALOG_RESCAN_INTERVAL

local function getWeatherCatalogScanRoots()
    local roots, seen = {}, {}
    local function add(root)
        if root and not seen[root] then
            seen[root] = true
            table.insert(roots, root)
        end
    end

    local function addHintedDescendantRoots(base)
        if not base then return end
        local ok, descendants = pcall(function() return base:GetDescendants() end)
        if not ok then return end
        local scanned = 0
        for _, desc in ipairs(descendants) do
            scanned = scanned + 1
            if scanned > 1500 then break end
            local key = normalizeName(desc.Name)
            if string.find(key, "weather") or string.find(key, "environment") or key == "icons" or key == "images" or key == "weathericons" or key == "weatherimages" then
                add(desc)
            end
        end
    end

    local weatherUI = PlayerGui:FindFirstChild("WeatherUI")
    add(weatherUI)

    local playerScripts = LocalPlayer:FindFirstChild("PlayerScripts")
    if playerScripts then
        add(findChildByNormalizedName(playerScripts, { "Controllers", "controllers" }))
        add(findChildByNormalizedName(playerScripts, { "WeatherController", "weathercontroller", "Weather Controller" }))
    end

    add(ReplicatedStorage:FindFirstChild("Weather"))
    add(ReplicatedStorage:FindFirstChild("WeatherIcons"))
    add(ReplicatedStorage:FindFirstChild("WeatherImages"))
    add(ReplicatedStorage:FindFirstChild("Environment"))

    if SharedModules then
        add(findChildByNormalizedName(SharedModules, { "Weather", "WeatherData", "WeatherImages", "WeatherIcons", "Environment", "EnvironmentData" }))
        addHintedDescendantRoots(SharedModules)
    end
    addHintedDescendantRoots(ReplicatedStorage)

    return roots
end

local function rebuildWeatherCatalogCache()
    local catalog, visited = {}, 0

    local function add(rawName, root, allowUnknown)
        if not rawName or rawName == "" or not root then return end
        if isTechnicalPhaseName(rawName) or isDecorativeWeatherCatalogName(rawName) then return end
        local displayName = cleanWeatherStateName(rawName)
        if not displayName then
            if isWeatherPhaseName(rawName) then
                displayName = cleanPhaseName(rawName)
            elseif allowUnknown then
                displayName = formatCamelCase(rawName)
            else
                return
            end
        end
        if catalog[displayName] then return end
        local image = findImageId(root, displayName or rawName)
        if image then
            catalog[displayName] = { name = displayName, image = image }
        end
    end

    local function addFromAncestor(inst)
        local p, depth = inst, 0
        while p and depth < 4 do
            add(p.Name, p)
            p = p.Parent
            depth = depth + 1
        end
    end

    local weatherUI = PlayerGui:FindFirstChild("WeatherUI")
    local frame = weatherUI and weatherUI:FindFirstChild("Frame")
    if frame then
        for _, child in ipairs(frame:GetChildren()) do
            if child:IsA("GuiObject") then
                add(child.Name, child, true)
            end
        end
    end

    for _, root in ipairs(getWeatherCatalogScanRoots()) do
        if visited >= WEATHER_CATALOG_SCAN_LIMIT then break end
        add(root.Name, root)
        local ok, descendants = pcall(function() return root:GetDescendants() end)
        if ok then
            for _, desc in ipairs(descendants) do
                visited = visited + 1
                if visited > WEATHER_CATALOG_SCAN_LIMIT then break end
                add(desc.Name, desc)
                if desc:IsA("ImageLabel") or desc:IsA("ImageButton") or desc:IsA("StringValue") or desc:IsA("IntValue") or desc:IsA("NumberValue") then
                    addFromAncestor(desc)
                end
            end
        end
    end

    weatherCatalogCache = catalog
    weatherCatalogCacheAt = os.clock()
end

local function getWeatherCatalog()
    local catalog = {}
    local function add(rawName, root, allowUnknown)
        if not rawName or rawName == "" or not root then return end
        if isTechnicalPhaseName(rawName) or isDecorativeWeatherCatalogName(rawName) then return end
        local image = findImageId(root, rawName)
        if not image then return end
        local displayName = cleanWeatherStateName(rawName) or (isWeatherPhaseName(rawName) and cleanPhaseName(rawName) or (allowUnknown and formatCamelCase(rawName) or nil))
        if not displayName or displayName == "" then displayName = rawName end
        catalog[displayName] = {
            name = displayName,
            image = image
        }
    end

    local weatherUI = PlayerGui:FindFirstChild("WeatherUI")
    local frame = weatherUI and weatherUI:FindFirstChild("Frame")
    if frame then
        for _, child in ipairs(frame:GetChildren()) do
            if child:IsA("GuiObject") then
                add(child.Name, child, true)
            end
        end
    end

    local phases = getPhasesFolder()
    if phases then
        for _, child in ipairs(phases:GetChildren()) do
            add(child.Name, child)
        end
    end

    if (os.clock() - weatherCatalogCacheAt) > WEATHER_CATALOG_RESCAN_INTERVAL then
        pcall(rebuildWeatherCatalogCache)
    end
    for name, item in pairs(weatherCatalogCache) do
        if not catalog[name] then
            catalog[name] = item
        end
    end

    return catalog
end

local function getActiveWeatherAndPhase()
    local activePhase = getDefaultPhase()
    local workspacePhase = findActivePhaseAsset(workspace, true)
    if workspacePhase then activePhase = workspacePhase end

    local activeWeathers = {}
    local weatherUI = PlayerGui:FindFirstChild("WeatherUI")
    local frame = weatherUI and weatherUI:FindFirstChild("Frame")
    local timerText = getActiveTimerText()
    local parsedSec = parseTimeToSeconds(timerText)
    local endTime = parsedSec > 0 and (os.time() + parsedSec) or 0

    local activePhaseImage = nil
    local uiPhase = nil
    if frame then
        for _, child in ipairs(frame:GetChildren()) do
            if child:IsA("GuiObject") and isWeatherCardActive(child) then
                local name = child.Name
                local lowerName = string.lower(name)
                local lowerKey = normalizeName(name)
                local weatherName = formatCamelCase(name)
                local isPhase = isWeatherPhaseName(name)
                if not isPhase then
                    weatherName = cleanWeatherStateName(name) or weatherName
                    activeWeathers[weatherName] = { playing = true, endTime = endTime, image = findImageId(child, weatherName) }
                else
                    activePhaseImage = findImageId(child, name)
                    if lowerName == "day" then
                        uiPhase = "Day"
                    elseif lowerName == "sunset" then
                        uiPhase = "Sunset"
                    elseif lowerName == "night" or lowerName == "moon" then
                        uiPhase = "Moon"
                    end
                    for _, phaseName in ipairs(getKnownPhaseNames()) do
                        local phaseKey = normalizeName(phaseName)
                        local cleanName = cleanPhaseName(phaseName)
                        local cleanKey = normalizeName(cleanName)
                        if lowerKey == phaseKey or lowerKey == cleanKey or string.find(lowerKey, phaseKey) or string.find(lowerKey, cleanKey) then
                            uiPhase = cleanName
                        end
                    end
                end
            end
        end
    end
    if uiPhase then activePhase = uiPhase end
    return activePhase, activePhaseImage, activeWeathers, endTime
end

local function getWeathersHash(weathers)
    local parts = {}
    for name, info in pairs(weathers) do
        if info.playing then table.insert(parts, name .. ":true") end
    end
    table.sort(parts)
    return table.concat(parts, "|")
end

local function getWeatherCatalogHash(catalog)
    local parts = {}
    for name, info in pairs(catalog or {}) do
        table.insert(parts, tostring(name) .. ":" .. tostring(info and info.image or ""))
    end
    table.sort(parts)
    return table.concat(parts, "|")
end

local function getCatalogImageByName(catalog, name)
    if not catalog or not name then return nil end
    local wantedKey = normalizeName(name)
    if wantedKey == "" then return nil end
    for catalogName, item in pairs(catalog) do
        if type(item) == "table" then
            local itemName = item.name or catalogName
            if normalizeName(catalogName) == wantedKey or normalizeName(itemName) == wantedKey then
                return item.image
            end
        end
    end
    return nil
end

-- Legacy GUI parser retained only as dead fallback/reference; active code below uses
-- FruitImages + FruitStock snapshots and never calls these legacy* functions.
local function legacyGetFruitRefreshTimer()
    return nil
end

local function legacyGetFruitMultipliers()
    if true then return {} end
    local multipliers = {}
    local success, err = pcall(function()
        local fruitStockPrice = PlayerGui:FindFirstChild("FruitStockPrice")
        if not fruitStockPrice then
            for _, child in ipairs(PlayerGui:GetChildren()) do
                if child:IsA("ScreenGui") then
                    local nl = string.lower(child.Name)
                    if string.find(nl, "fruit") and (string.find(nl, "stock") or string.find(nl, "price") or string.find(nl, "multiplier")) then
                        fruitStockPrice = child
                        break
                    end
                end
            end
        end
        if not fruitStockPrice then return end

        local scrollingFrame = fruitStockPrice:FindFirstChildOfClass("ScrollingFrame")
            or fruitStockPrice:FindFirstChild("ScrollingFrame", true)
        if not scrollingFrame then
            for _, desc in ipairs(fruitStockPrice:GetDescendants()) do
                if desc:IsA("Frame") and desc.Name ~= "Frame" then
                    for _, c in ipairs(desc:GetChildren()) do
                        local cl = string.lower(c.Name)
                        if string.find(cl, "card") or string.find(cl, "fruit") then
                            scrollingFrame = desc
                            break
                        end
                    end
                    if scrollingFrame then break end
                end
            end
        end
        if not scrollingFrame then return end

        local seen = {}
        for _, card in ipairs(scrollingFrame:GetChildren()) do
            if card:IsA("GuiObject") and isInstanceVisible(card) then
                local nameLower = string.lower(card.Name)
                local isLayoutOrTemplate = string.find(nameLower, "layout") or string.find(nameLower, "padding")
                    or string.find(nameLower, "constraint") or nameLower == "template" or nameLower == "itemtemplate"
                if not isLayoutOrTemplate then
                    local frameInner = card:FindFirstChild("Frame") or card:FindFirstChildOfClass("Frame")

                    -- Multiplier value
                    local multText, multiplierLabel = nil, nil
                    if frameInner then
                        multiplierLabel = findChildByNormalizedName(frameInner, { "Multiplier" })
                        if multiplierLabel and multiplierLabel:IsA("TextLabel") then
                            multText = multiplierLabel.Text or ""
                        end
                    end
                    if not multText or multText == "" then
                        local searchRoot = frameInner or card
                        for _, desc in ipairs(searchRoot:GetDescendants()) do
                            if desc:IsA("TextLabel") and desc.Text and desc.Text ~= "" then
                                local cleanText = desc.Text:gsub(",", ".")
                                local num = string.match(cleanText, "([%d%.]+)")
                                if num then
                                    local lowerText = string.lower(desc.Text)
                                    if string.find(lowerText, "x") or string.find(lowerText, "х") or string.find(lowerText, "%*") 
                                       or string.match(cleanText, "^%s*[%d%.]+%s*$") then
                                        multText = num
                                        multiplierLabel = desc
                                        break
                                    end
                                end
                            end
                        end
                    end
                    if not multText then multText = "1" end
                    local valNum = tonumber(string.match(multText:gsub(",", "."), "([%d%.]+)")) or 1.0

                    -- Image
                    local imageAssetId = nil
                    if frameInner then
                        local fruitVector = findChildByNormalizedName(frameInner, { "FruitVector" })
                        if fruitVector and (fruitVector:IsA("ImageLabel") or fruitVector:IsA("ImageButton")) then
                            imageAssetId = string.match(fruitVector.Image or "", "%d+")
                        end
                    end
                    if not imageAssetId then
                        local searchRoot = frameInner or card
                        for _, desc in ipairs(searchRoot:GetDescendants()) do
                            if (desc:IsA("ImageLabel") or desc:IsA("ImageButton")) then
                                local dn = string.lower(desc.Name)
                                if dn ~= "beveleffect" and dn ~= "sunburst" and dn ~= "shadow" then
                                    local aid = string.match(desc.Image or "", "%d+")
                                    if aid and aid ~= "112886786873408" then
                                        imageAssetId = aid
                                        break
                                    end
                                end
                            end
                        end
                    end

                    -- Name: attribute > StringValue > label > asset map
                    local fruitName = nil
                    local toolTipAttr = card:GetAttribute("SeedToolTip") or (frameInner and frameInner:GetAttribute("SeedToolTip"))
                    if toolTipAttr and type(toolTipAttr) == "string" and toolTipAttr ~= "" then
                        fruitName = cleanScrapedName(toolTipAttr)
                    end
                    if not fruitName then
                        local toolTipVal = card:FindFirstChild("SeedToolTip", true)
                        if toolTipVal and (toolTipVal:IsA("StringValue") or toolTipVal:IsA("TextLabel")) then
                            local text = toolTipVal:IsA("StringValue") and toolTipVal.Value or toolTipVal.Text
                            if text and text ~= "" then fruitName = cleanScrapedName(text) end
                        end
                    end
                    if not fruitName and frameInner then
                        for _, child in ipairs(frameInner:GetChildren()) do
                            if child:IsA("TextLabel") and child ~= multiplierLabel then
                                local cn = string.lower(child.Name)
                                if cn == "big" or cn == "mega" or cn == "title" or cn == "fruitname" or cn == "name" then
                                    local text = child.Text or ""
                                    if text ~= "" and not string.find(text, "[%d]") and not string.find(string.lower(text), "^x") then
                                        local cleanText = text:gsub("^%s*(.-)%s*$", "%1")
                                        if cleanText ~= "" then fruitName = cleanText; break end
                                    end
                                end
                            end
                        end
                        if not fruitName then
                            for _, child in ipairs(frameInner:GetChildren()) do
                                if child:IsA("TextLabel") and child ~= multiplierLabel then
                                    local cn = string.lower(child.Name)
                                    if cn ~= "multiplier" and cn ~= "cost_text" and cn ~= "stock_text" and cn ~= "rarity_text" then
                                        local text = child.Text or ""
                                        if text ~= "" and not string.find(text, "[%d]") and not string.find(string.lower(text), "^x") then
                                            local cleanText = text:gsub("^%s*(.-)%s*$", "%1")
                                            if cleanText ~= "" then fruitName = cleanText; break end
                                        end
                                    end
                                end
                            end
                        end
                    end
                    if not fruitName and imageAssetId and assetToItemNameMap[imageAssetId] then
                        fruitName = assetToItemNameMap[imageAssetId]
                    end
                    if not fruitName then
                        local searchRoot = frameInner or card
                        for _, desc in ipairs(searchRoot:GetDescendants()) do
                            if desc:IsA("TextLabel") and desc ~= multiplierLabel
                               and not (multiplierLabel and desc:IsDescendantOf(multiplierLabel)) then
                                local dn = string.lower(desc.Name)
                                if dn ~= "multiplier" and dn ~= "cost_text" and dn ~= "stock_text" and dn ~= "rarity_text" then
                                    local text = desc.Text or ""
                                    if text ~= "" and not string.find(text, "[%d]") and not string.find(string.lower(text), "^x") then
                                        local cleanText = text:gsub("^%s*(.-)%s*$", "%1")
                                        if cleanText ~= "" then fruitName = cleanText; break end
                                    end
                                end
                            end
                        end
                    end

                    local key
                    if fruitName then key = fruitName
                    elseif imageAssetId then key = "Asset_" .. imageAssetId
                    else key = "Unknown_" .. tostring(#multipliers + 1) end

                    if seen[key] then
                        if valNum > (multipliers[seen[key]].multiplier or 0) then
                            multipliers[seen[key]].multiplier = valNum
                        end
                    else
                        seen[key] = (#multipliers + 1)
                        table.insert(multipliers, {
                            name = fruitName,
                            image = imageAssetId,
                            key = key,
                            multiplier = valNum
                        })
                    end
                end
            end
        end
    end)
    if not success and DEBUG then
        warn("[Grow a Garden 2 Stocker] Error getting fruit multipliers: " .. tostring(err))
    end
    return multipliers
end

-- Active fruit multiplier source:
-- FruitImages gives fruit name -> image id, FruitStock snapshot gives fruit name -> multiplier/tier.
local function cleanScrapedName(name)
    if not name then return nil end
    local str = tostring(name)
    if string.find(string.lower(str), "^photo_") then return string.sub(str, 7) end
    return str
end

local function safeRequireModule(moduleScript)
    if not moduleScript then return nil end
    local ok, result = pcall(function()
        return require(moduleScript)
    end)
    if ok then return result end
    if DEBUG then
        warn("[Grow a Garden 2 Stocker] Failed to require " .. tostring(moduleScript.Name) .. ": " .. tostring(result))
    end
    return nil
end

local function getSharedModule(moduleName)
    local root = SharedModules or ReplicatedStorage:FindFirstChild("SharedModules")
    return root and root:FindFirstChild(moduleName) or nil
end

local cachedNetworking = nil

local function getNetworkingModule()
    if not cachedNetworking then
        cachedNetworking = safeRequireModule(getSharedModule("Networking"))
    end
    return cachedNetworking
end

local function normalizeAssetRef(value)
    if value == nil then return nil end
    local str = tostring(value)
    if str == "" then return nil end
    if string.sub(str, 1, 4) == "http" or string.sub(str, 1, 1) == "/" then
        return str
    end
    return string.match(str, "[iI][dD]=(%d+)") or string.match(str, "%d+") or str
end

local fruitImageCache = {}
local fruitImageCacheByKey = {}
local fruitImagesWatched = {}
local fruitImagesFolderConnected = false
local fruitImageCacheBuilt = false
local fruitListCache = nil

local function getFruitImagesFolder()
    local root = SharedModules or ReplicatedStorage:FindFirstChild("SharedModules")
    local seedData = root and root:FindFirstChild("SeedData")
    return seedData and seedData:FindFirstChild("FruitImages") or nil
end

local function readFruitImageEntry(entry)
    if not entry then return nil end
    if entry:IsA("StringValue") or entry:IsA("IntValue") or entry:IsA("NumberValue") then
        return normalizeAssetRef(entry.Value)
    end
    if entry:IsA("ImageLabel") or entry:IsA("ImageButton") then
        return normalizeAssetRef(entry.Image)
    end
    local attr = entry:GetAttribute("Image") or entry:GetAttribute("ImageId") or entry:GetAttribute("TextureId")
    return normalizeAssetRef(attr)
end

local function setFruitImageCacheValue(entry)
    local name = cleanScrapedName(entry and entry.Name)
    if not name or name == "" then return end

    local image = readFruitImageEntry(entry)
    local key = normalizeName(name)
    if fruitImageCache[name] ~= image or fruitImageCacheByKey[key] ~= image then
        fruitImageCache[name] = image
        fruitImageCacheByKey[key] = image
        fruitListCache = nil
    end
end

local function removeFruitImageCacheValue(entry)
    local name = cleanScrapedName(entry and entry.Name)
    if not name or name == "" then return end
    fruitImageCache[name] = nil
    fruitImageCacheByKey[normalizeName(name)] = nil
    fruitListCache = nil
end

local function watchFruitImageEntry(entry)
    if not entry or fruitImagesWatched[entry] then return end
    fruitImagesWatched[entry] = entry.Changed:Connect(function()
        setFruitImageCacheValue(entry)
    end)
end

local function ensureFruitImageCache()
    local folder = getFruitImagesFolder()
    if not folder then return end

    if not fruitImagesFolderConnected then
        fruitImagesFolderConnected = true
        folder.ChildAdded:Connect(function(entry)
            setFruitImageCacheValue(entry)
            watchFruitImageEntry(entry)
        end)
        folder.ChildRemoved:Connect(function(entry)
            removeFruitImageCacheValue(entry)
            local conn = fruitImagesWatched[entry]
            if conn then
                conn:Disconnect()
                fruitImagesWatched[entry] = nil
            end
        end)
    end

    if fruitImageCacheBuilt then return end
    fruitImageCacheBuilt = true
    for _, entry in ipairs(folder:GetChildren()) do
        setFruitImageCacheValue(entry)
        watchFruitImageEntry(entry)
    end
end

local function getFruitImage(fruitName)
    ensureFruitImageCache()
    local name = cleanScrapedName(fruitName)
    if not name then return nil end
    return fruitImageCache[name] or fruitImageCacheByKey[normalizeName(name)]
end

local latestFruitEntries = {}
local latestFruitEntriesByKey = {}
local latestFruitSnapshotAt = 0
local fruitServerOffset = 0
local fruitNextRefreshUnix = 0
local fruitRequestPending = false
local lastFruitRequestAt = -FRUIT_REQUEST_INTERVAL
local fruitSnapshotConnected = false

local function applyFruitSnapshot(snapshot)
    if type(snapshot) ~= "table" then return false end

    if type(snapshot.server_now_unix) == "number" then
        fruitServerOffset = snapshot.server_now_unix - os.time()
    end
    if type(snapshot.nextRefreshUnix) == "number" then
        fruitNextRefreshUnix = snapshot.nextRefreshUnix
    end

    local rawEntries = snapshot.entries
        or snapshot.fruits
        or snapshot.multipliers
        or snapshot.fruitMultipliers

    if type(rawEntries) ~= "table" then
        if DEBUG then
            warn("[Grow a Garden 2 Stocker] FruitStock snapshot missing entries table")
        end
        return false
    end

    local entries = {}
    local entriesByKey = {}
    local count = 0

    local function addEntry(fruitName, rawEntry)
        if type(rawEntry) ~= "table" and type(rawEntry) ~= "number" then return end

        local name = fruitName
        local multiplier = 1
        local tier = "normal"

        if type(rawEntry) == "number" then
            multiplier = rawEntry
        else
            name = rawEntry.name or rawEntry.key or rawEntry.fruit or rawEntry.itemName or rawEntry.seed or name
            local rawMultiplier = rawEntry.multiplier or rawEntry.rate or rawEntry.value or rawEntry.mult or rawEntry[1]
            if type(rawMultiplier) == "string" then
                rawMultiplier = string.match(rawMultiplier:gsub(",", "."), "([%d%.]+)")
            end
            multiplier = tonumber(rawMultiplier) or 1
            if type(rawEntry.tier) == "string" then tier = rawEntry.tier end
        end

        if type(name) ~= "string" or name == "" then return end
        local cleanName = cleanScrapedName(name)
        if not cleanName or cleanName == "" then return end

        local info = {
            multiplier = multiplier,
            tier = tier
        }
        entries[cleanName] = info
        entriesByKey[normalizeName(cleanName)] = info
        count = count + 1
    end

    for fruitName, rawEntry in pairs(rawEntries) do
        addEntry(type(fruitName) == "string" and fruitName or nil, rawEntry)
    end

    if count <= 0 then
        if DEBUG then
            warn("[Grow a Garden 2 Stocker] FruitStock snapshot had no usable entries")
        end
        return false
    end

    latestFruitEntries = entries
    latestFruitEntriesByKey = entriesByKey
    fruitListCache = nil
    latestFruitSnapshotAt = os.clock()
    return true
end

local function getFruitStockNetworking()
    local networking = getNetworkingModule()
    return networking and networking.FruitStock or nil
end

local function requestFruitSnapshot(force)
    local now = os.clock()
    if fruitRequestPending then return false end
    if not force and (now - lastFruitRequestAt) < FRUIT_REQUEST_INTERVAL then
        return false
    end

    local fruitStock = getFruitStockNetworking()
    local requestRemote = fruitStock and fruitStock.Request
    if not requestRemote then return false end

    fruitRequestPending = true
    lastFruitRequestAt = now

    local ok, result = pcall(function()
        if requestRemote.Fire then
            return requestRemote:Fire()
        end
        if requestRemote.InvokeServer then
            return requestRemote:InvokeServer()
        end
        if requestRemote.Invoke then
            return requestRemote:Invoke()
        end
        return nil
    end)

    fruitRequestPending = false
    if ok and type(result) == "table" then
        return applyFruitSnapshot(result)
    end
    if DEBUG and not ok then
        warn("[Grow a Garden 2 Stocker] FruitStock.Request failed: " .. tostring(result))
    end
    return false
end

local function connectFruitStockSnapshot(onSnapshot)
    if fruitSnapshotConnected then return end
    local fruitStock = getFruitStockNetworking()
    local snapshotEvent = fruitStock and fruitStock.Snapshot
    if not snapshotEvent then return end

    local connected = false
    local ok, err = pcall(function()
        if snapshotEvent.OnClientEvent then
            snapshotEvent.OnClientEvent:Connect(function(snapshot)
                if applyFruitSnapshot(snapshot) and onSnapshot then
                    onSnapshot()
                end
            end)
            connected = true
        elseif snapshotEvent.Connect then
            snapshotEvent:Connect(function(snapshot)
                if applyFruitSnapshot(snapshot) and onSnapshot then
                    onSnapshot()
                end
            end)
            connected = true
        end
    end)

    fruitSnapshotConnected = ok and connected
    if DEBUG and not ok then
        warn("[Grow a Garden 2 Stocker] Failed to connect FruitStock.Snapshot: " .. tostring(err))
    end
end

local function getFruitRefreshTimer()
    if fruitNextRefreshUnix <= 0 then
        requestFruitSnapshot(false)
    end
    if fruitNextRefreshUnix <= 0 then return nil end
    return math.max(0, math.floor(fruitNextRefreshUnix - (os.time() + fruitServerOffset)))
end

local function addFruitName(list, seen, name)
    local cleanName = cleanScrapedName(name)
    if not cleanName or cleanName == "" then return end
    local key = normalizeName(cleanName)
    if key == "" or seen[key] then return end
    seen[key] = true
    table.insert(list, cleanName)
end

local function getKnownFruitNames()
    ensureFruitImageCache()

    local names = {}
    local seen = {}

    for fruitName in pairs(fruitImageCache) do
        addFruitName(names, seen, fruitName)
    end

    for fruitName in pairs(latestFruitEntries) do
        addFruitName(names, seen, fruitName)
    end

    table.sort(names, function(a, b)
        return string.lower(a) < string.lower(b)
    end)
    return names
end

local function getFruitEntry(fruitName)
    if not fruitName then return nil end
    return latestFruitEntries[fruitName] or latestFruitEntriesByKey[normalizeName(fruitName)]
end

local function getFruitMultipliers()
    ensureFruitImageCache()
    if latestFruitSnapshotAt == 0 or (os.clock() - latestFruitSnapshotAt) > FRUIT_REQUEST_INTERVAL then
        requestFruitSnapshot(false)
    end
    if fruitListCache and #fruitListCache > 0 then return fruitListCache end

    local multipliers = {}
    for _, fruitName in ipairs(getKnownFruitNames()) do
        local entry = getFruitEntry(fruitName)
        local multiplier = entry and tonumber(entry.multiplier) or 1
        local tier = entry and entry.tier or "normal"
        table.insert(multipliers, {
            name = fruitName,
            image = getFruitImage(fruitName),
            key = fruitName,
            multiplier = multiplier,
            tier = tier
        })
    end

    table.sort(multipliers, function(a, b)
        if a.multiplier == b.multiplier then
            return string.lower(a.name or "") < string.lower(b.name or "")
        end
        return a.multiplier > b.multiplier
    end)

    if #multipliers > 0 then
        fruitListCache = multipliers
    end
    return multipliers
end

-- ================== STATE POLLING + UPDATE ==================
-- Compact hash of a fruit list, used by the fast poll to detect value changes.
local function fruitHash(list)
    local h = ""
    for _, m in ipairs(list) do
        h = h .. (m.key or "?") .. ":" .. tostring(m.multiplier) .. ":" .. tostring(m.tier) .. ":" .. tostring(m.image) .. "|"
    end
    return h
end

local lastUpdateTime = 0
local updatePending = false
local pendingFruitData = nil

-- updateAPI(fruitData): fruitData is an optional pre-scraped fruit list. If nil,
-- fruits are scraped fresh inside. We ALWAYS send live fruit data (never a stale
-- cache) so the website/bot reflects in-game multiplier changes immediately.
local function updateAPI(fruitData)
    pendingFruitData = fruitData or pendingFruitData
    if updatePending then return end
    local now = os.clock()
    local elapsed = now - lastUpdateTime
    if elapsed < 1.0 then
        updatePending = true
        local waitLeft = 1.0 - elapsed
        task.delay(waitLeft, function()
            updatePending = false
            local dataToSend = pendingFruitData
            pendingFruitData = nil
            updateAPI(dataToSend)
        end)
        return
    end
    lastUpdateTime = now
    local dataToSend = pendingFruitData
    pendingFruitData = nil

    local success, err = pcall(function()
        local function resolveShopPath(shopName, innerName)
            local shop = findChildByNormalizedName(PlayerGui, { shopName })
            if not shop then return nil end
            local frame = findChildByNormalizedName(shop, { "Frame" })
            if not frame then return nil end
            return findChildByNormalizedName(frame, { innerName })
        end

        local phase, phaseImage, weathers, endTime = getActiveWeatherAndPhase()
        local isNight = isNightPhase(phase)
        local weatherCatalog = getWeatherCatalog()
        if not phaseImage then
            phaseImage = getCatalogImageByName(weatherCatalog, phase)
        end
        for weatherName, info in pairs(weathers or {}) do
            if info and not info.image then
                info.image = getCatalogImageByName(weatherCatalog, weatherName)
            end
        end

        local data = {
            password = API_PASSWORD,
            jobId = game.JobId ~= "" and game.JobId or "studio",
            restockTimes = getRestockTimes(),
            weather = {
                night = isNight,
                phase = phase,
                phaseImage = phaseImage,
                weathers = weathers,
                endTime = endTime
            },
            weatherCatalog = weatherCatalog,
            shops = {
                CrateShop = scrapeShopSafe(resolveShopPath("CrateShop", "ScrollingFrame")),
                GearShop = scrapeShopSafe(resolveShopPath("GearShop", "ScrollingFrame")),
                SeedShop_Normal = scrapeShopSafe(resolveShopPath("SeedShop", "NormalShop"))
            },
            -- ALWAYS send live fruit data (never a stale cache) so the website reflects
            -- in-game multiplier changes immediately.
            fruitMultipliers = dataToSend or fruitData or getFruitMultipliers(),
            -- Seconds until the next in-game multiplier refresh (dynamic countdown).
            fruitRefreshTimer = getFruitRefreshTimer()
        }

        task.spawn(function()
            local encodeOk, encoded = pcall(function() return HttpService:JSONEncode(data) end)
            if not encodeOk then
                warn("[Grow a Garden 2 Stocker] JSON encoding failed: " .. tostring(encoded))
                return
            end

            -- Try updating via WebSocket first
            local ws = getWebSocketClient()
            if ws then
                local wsPayload = {
                    type = "update-stock",
                    password = API_PASSWORD,
                    data = data
                }
                local encodeOk2, encodedWs = pcall(function() return HttpService:JSONEncode(wsPayload) end)
                if encodeOk2 then
                    local sendFunc = ws.Send or ws.send
                    local wsSuccess, wsErr = pcall(function()
                        sendFunc(ws, encodedWs)
                    end)
                    if wsSuccess then
                        if DEBUG then
                            print("[Grow a Garden 2 Stocker] Stock data updated instantly via WebSocket!")
                        end
                        return -- Success, skip HTTP fallback
                    else
                        warn("[Grow a Garden 2 Stocker] WebSocket send failed: " .. tostring(wsErr) .. ". Falling back to HTTP POST...")
                        -- Reset connection on error
                        pcall(function() ws:Close() end)
                        pcall(function() ws:close() end)
                        wsConnection = nil
                    end
                end
            end

            -- Fallback HTTP POST update
            local ok, response = makeHttpRequest(API_URL, "POST",
                { ["Content-Type"] = "application/json", ["X-API-Password"] = API_PASSWORD }, encoded)
            if ok then
                if DEBUG then
                    print("[Grow a Garden 2 Stocker] Stock data updated via HTTP POST: " .. tostring(response))
                end
            else
                warn("[Grow a Garden 2 Stocker] Failed to update stock data: " .. tostring(response))
            end
        end)
    end)
    if not success then
        warn("[Grow a Garden 2 Stocker] Error during updateAPI: " .. tostring(err))
    end
end

-- ================== EVENT HOOKS ==================
-- FruitStock.Snapshot is the same source FruitStockPriceController uses for x4/x5 values.
pcall(function()
    connectFruitStockSnapshot(function()
        updateAPI(getFruitMultipliers())
    end)
    requestFruitSnapshot(true)
end)

task.spawn(function()
    while not fruitSnapshotConnected do
        task.wait(5)
        connectFruitStockSnapshot(function()
            updateAPI(getFruitMultipliers())
        end)
    end
end)

local StockValues = ReplicatedStorage:WaitForChild("StockValues", 10)
if StockValues then
    print("[Grow a Garden 2 Stocker] Monitoring StockValues folder for updates...")
    for _, shopFolder in ipairs(StockValues:GetChildren()) do
        local nextRestock = shopFolder:FindFirstChild("UnixNextRestock")
        if nextRestock then
            nextRestock.Changed:Connect(function()
                task.wait(1.5)
                updateAPI(nil)
            end)
        end
    end
else
    if DEBUG then
        warn("[Grow a Garden 2 Stocker] StockValues folder not found in ReplicatedStorage.")
    end
end

-- ================== LOOPS ==================
-- Fast poll: detect phase / weather / fruit-multiplier changes. Fruits are scraped
-- once here and passed DIRECTLY to updateAPI (no stale cache) so the website always
-- reflects the latest in-game values the moment they change.
local lastPhase = nil
local lastWeathersHash = ""
local lastWeatherCatalogHash = ""
local lastFruitHash = ""

task.spawn(function()
    while true do
        task.wait(POLL_INTERVAL)
        local phase, _, weathers = getActiveWeatherAndPhase()
        local weathersHash = getWeathersHash(weathers)
        local weatherCatalogHash = getWeatherCatalogHash(getWeatherCatalog())

        local freshFruits = getFruitMultipliers()
        local fh = fruitHash(freshFruits)
        local fruitChanged = (fh ~= lastFruitHash)

        if phase ~= lastPhase or weathersHash ~= lastWeathersHash or weatherCatalogHash ~= lastWeatherCatalogHash or fruitChanged then
            lastPhase = phase
            lastWeathersHash = weathersHash
            lastWeatherCatalogHash = weatherCatalogHash
            lastFruitHash = fh
            -- Pass the freshly scraped fruit list so updateAPI doesn't re-scrape,
            -- and the data sent to the API is guaranteed current.
            updateAPI(freshFruits)
        end
    end
end)

-- Fallback periodic update: scrape everything fresh inside updateAPI (fruitData=nil
-- means "scrape fresh"), guaranteeing the site gets current data even if the fast
-- poll detected no change (e.g. UI re-opened, values rotated server-side).
task.spawn(function()
    while true do
        updateAPI(nil)
        task.wait(UPDATE_INTERVAL)
    end
end)

-- Fruit multipliers no longer need GUI/card scraping, asset-map scans, or forced
-- FruitStockPrice visibility; snapshots drive updates directly.

-- Apply client optimizations LAST, so all monitoring hooks are already connected.
optimizeClient()

print("[Grow a Garden 2 Stocker] Scraper loaded (" .. (MOBILE_SAFE_MODE and "Mobile Safe Mode" or "Extreme Optimization") .. ")!")
