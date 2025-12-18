# PuzzleForge: AI-Powered Puzzle Game Platform

## Technical Specification & Investment Overview

**Version:** 1.0 MVP
**Date:** December 2024
**Status:** Pre-Seed / MVP Development

---

# Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Market Opportunity](#3-market-opportunity)
4. [How It Works](#4-how-it-works)
5. [Technical Architecture](#5-technical-architecture)
6. [AI Integration Deep Dive](#6-ai-integration-deep-dive)
7. [MVP Specification](#7-mvp-specification)
8. [Platform Economics](#8-platform-economics)
9. [Roadmap](#9-roadmap)
10. [Future Vision: Universal Game Currency](#10-future-vision-universal-game-currency)
11. [Technical Implementation Details](#11-technical-implementation-details)
12. [Risk Assessment & Mitigation](#12-risk-assessment--mitigation)
13. [Team Requirements](#13-team-requirements)
14. [Investment Ask](#14-investment-ask)

---

# 1. Executive Summary

## What is PuzzleForge?

**PuzzleForge is "Roblox for Puzzle Games" — an AI-powered platform where anyone can create, publish, and monetize professional puzzle games through natural language prompts.**

Instead of coding or using complex game engines, creators simply describe what they want:

> "Create a bakery-themed match-3 game with warm pastry colors and cozy music"

The AI generates:
- Complete visual theme (colors, UI styling)
- Core gameplay (match-3 mechanics via Phaser.js)
- 50+ levels with balanced difficulty progression
- Shop, monetization, and social features
- Ready-to-publish game on a unique URL

**The creator gets a fully functional, monetizable puzzle game in minutes, not months.**

## The Problem We Solve

| Traditional Game Development | PuzzleForge |
|------------------------------|-------------|
| 6-12 months development time | Minutes to hours |
| $50K-$500K development cost | Free to $49/month subscription |
| Requires programmers, artists, designers | Anyone with an idea |
| Complex deployment and distribution | One-click publish |
| Fragmented monetization | Built-in ads, IAP, revenue sharing |

## Key Differentiators

1. **AI-First Architecture**: Every component is designed for AI manipulation — themes, levels, mechanics, content
2. **Instant Iteration**: Change colors, icons, difficulty via prompt in real-time
3. **Pre-Built Game Shell**: Menu systems, shop, social features, events — already done
4. **Phaser.js Core**: Professional HTML5 game engine for smooth, native-feel gameplay
5. **Web-Native**: No app store approval, instant updates, works everywhere

## Traction Potential

- **Market**: $13B mobile puzzle game market (2024)
- **Target Users**: Content creators, influencers, indie developers, brands, educators
- **Monetization**: Platform subscription + revenue share on creator earnings

---

# 2. Product Vision

## The 30-Second Pitch

> "YouTube democratized video. Canva democratized design. PuzzleForge democratizes game development. Anyone can create a professional puzzle game by simply describing it."

## Core Thesis

The puzzle game genre is:
- **Massive**: Candy Crush alone generates $1B+ annually
- **Formulaic**: Match-3, word games, bubble shooters follow known patterns
- **Perfect for AI**: Structured rules, configurable parameters, visual themes

This makes puzzle games the ideal entry point for AI-generated gaming.

## User Personas

### Creator: "The Influencer"
- **Who**: YouTuber with 500K followers
- **Want**: Branded game for fan engagement
- **PuzzleForge**: Creates "Sarah's Word Adventure" in 30 minutes, shares with audience, earns from ads

### Creator: "The Hobbyist"
- **Who**: Retired teacher who loves puzzles
- **Want**: Create puzzles for grandkids
- **PuzzleForge**: Makes "Grandma's Garden Match" with family photos as tiles

### Creator: "The Entrepreneur"
- **Who**: Mobile game studio
- **Want**: Rapid prototyping and market testing
- **PuzzleForge**: Launches 10 themed games in a week, sees which gains traction

### Player: "The Casual Gamer"
- **Who**: Anyone who plays mobile games
- **Want**: Fresh puzzle experiences
- **PuzzleForge**: Discovers unique creator-made games, plays across devices

## Platform Principles

1. **Creation in Minutes**: First playable game under 5 minutes
2. **AI as Co-Creator**: AI suggests, human approves
3. **Everything is Configurable**: No hard-coded limits
4. **Creators Own Their Games**: Full revenue control
5. **Players First**: Quality games, fair monetization

---

# 3. Market Opportunity

## Mobile Puzzle Game Market

| Metric | Value | Source |
|--------|-------|--------|
| Global Market Size (2024) | $13.2 Billion | Newzoo |
| YoY Growth | 8.5% | Statista |
| Daily Active Users (top 10 games) | 250M+ | SensorTower |
| Avg Revenue Per User (puzzle) | $0.15-$0.50 | GameAnalytics |

## Competitive Landscape

### Game Builders (Indirect)
| Platform | Focus | Limitation |
|----------|-------|------------|
| Roblox | 3D games, kids | Complex, not puzzle-focused |
| Buildbox | Hyper-casual | Expensive, steep learning curve |
| GDevelop | General 2D | Technical, no AI |
| GameSalad | Education | Outdated, limited |

### AI Game Tools (Emerging)
| Tool | Focus | Limitation |
|------|-------|------------|
| Scenario.gg | Asset generation | Assets only, no games |
| Ludo.ai | Game ideation | Ideas only, no creation |
| Rosebud AI | AI NPCs | AAA focus, not casual |

### Our Position
**PuzzleForge is the only platform combining:**
- AI-powered full game generation
- Professional puzzle game mechanics
- Complete monetization infrastructure
- Web-native instant publishing

## Total Addressable Market

```
┌─────────────────────────────────────────────────────────────┐
│                    TAM / SAM / SOM                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TAM: $13.2B                                                │
│  └── Global mobile puzzle game market                       │
│                                                             │
│  SAM: $2.1B                                                 │
│  └── Indie/small studio puzzle games                        │
│  └── User-generated content platforms                       │
│                                                             │
│  SOM (Year 3): $50M                                         │
│  └── 10,000 active creators                                 │
│  └── $200/month avg creator spend                           │
│  └── 30% platform revenue share                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 4. How It Works

## Creator Journey

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CREATOR JOURNEY                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  STEP 1: DESCRIBE YOUR GAME                                             │
│  ════════════════════════════                                           │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  💬 "I want to create a word puzzle game about cooking.         │   │
│  │      Use warm kitchen colors - oranges, browns, creams.         │   │
│  │      Target audience is food lovers aged 25-45."                │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    ▼                                    │
│  STEP 2: AI GENERATES GAME                                              │
│  ═════════════════════════                                              │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  🤖 AI Generates:                                                │   │
│  │                                                                  │   │
│  │  • Game Name: "Word Kitchen"                                     │   │
│  │  • Theme: Warm culinary palette (#D2691E, #8B4513, #FFDAB9)     │   │
│  │  • Game Type: Word search/crossword hybrid                       │   │
│  │  • Mechanics: Find cooking-related words from letter grid        │   │
│  │  • 100 Levels: "Breakfast Basics" → "Master Chef Challenge"      │   │
│  │  • Word Lists: Auto-generated cooking vocabulary                 │   │
│  │  • Shop: Hint coins, extra time, word reveals                    │   │
│  │  • Events: "Holiday Recipe Rush", "Sunday Brunch Bonus"          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    ▼                                    │
│  STEP 3: PREVIEW & CUSTOMIZE                                            │
│  ═══════════════════════════                                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  👁️ Live Preview:                                                │   │
│  │                                                                  │   │
│  │  [Phone mockup showing game]                                     │   │
│  │                                                                  │   │
│  │  Creator: "Make the buttons more rounded"                        │   │
│  │  AI: ✓ Updated button border-radius to 16px                     │   │
│  │                                                                  │   │
│  │  Creator: "Add a chef hat icon to the logo"                      │   │
│  │  AI: ✓ Generated and applied chef hat icon                      │   │
│  │                                                                  │   │
│  │  Creator: "Level 5 is too hard, reduce words needed"             │   │
│  │  AI: ✓ Adjusted level 5: 8 words → 6 words                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    ▼                                    │
│  STEP 4: CONFIGURE MONETIZATION                                         │
│  ═══════════════════════════════                                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  💰 Monetization Settings:                                       │   │
│  │                                                                  │   │
│  │  ☑️ Enable Rewarded Video Ads (watch ad for hints)              │   │
│  │  ☑️ Enable Interstitial Ads (every 5 levels)                    │   │
│  │  ☑️ Enable In-App Purchases                                     │   │
│  │      • 100 Coins: $0.99                                          │   │
│  │      • 500 Coins: $3.99                                          │   │
│  │      • No Ads Pack: $4.99                                        │   │
│  │                                                                  │   │
│  │  Revenue Split: Creator 70% / Platform 30%                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                                    ▼                                    │
│  STEP 5: PUBLISH & SHARE                                                │
│  ═══════════════════════                                                │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  🚀 Published!                                                   │   │
│  │                                                                  │   │
│  │  Your game is live at:                                           │   │
│  │  🔗 wordkitchen.puzzleforge.games                               │   │
│  │                                                                  │   │
│  │  [Share to Twitter] [Share to Facebook] [Copy Link] [QR Code]    │   │
│  │                                                                  │   │
│  │  PWA Install: Players can "Add to Home Screen" for app-like UX   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Player Journey

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PLAYER JOURNEY                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. DISCOVER                                                            │
│     • Direct link from creator                                          │
│     • PuzzleForge game directory                                        │
│     • Social media / influencer promotion                               │
│     • Search engines                                                    │
│                                                                         │
│  2. PLAY INSTANTLY                                                      │
│     • No download required                                              │
│     • Works in any browser                                              │
│     • Optional: "Add to Home Screen" for PWA                            │
│                                                                         │
│  3. PROGRESS & ENGAGE                                                   │
│     • Complete levels, earn stars                                       │
│     • Unlock areas and content                                          │
│     • Participate in events                                             │
│     • Join teams (optional social)                                      │
│                                                                         │
│  4. MONETIZE (Optional)                                                 │
│     • Watch ads for rewards                                             │
│     • Purchase coins/boosters                                           │
│     • Buy premium content                                               │
│                                                                         │
│  5. SHARE & RETURN                                                      │
│     • Share progress with friends                                       │
│     • Daily rewards for retention                                       │
│     • Push notifications (PWA)                                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 5. Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PUZZLEFORGE ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                            ┌─────────────────┐                              │
│                            │   CLOUDFLARE    │                              │
│                            │   CDN + DNS     │                              │
│                            │   *.puzzleforge.games                          │
│                            └────────┬────────┘                              │
│                                     │                                       │
│         ┌───────────────────────────┼───────────────────────────┐           │
│         │                           │                           │           │
│         ▼                           ▼                           ▼           │
│  ┌─────────────┐            ┌─────────────┐            ┌─────────────┐      │
│  │  CREATOR    │            │   PLAYER    │            │   API       │      │
│  │  PORTAL     │            │   GAMES     │            │   GATEWAY   │      │
│  │             │            │             │            │             │      │
│  │ puzzleforge │            │ {game}.     │            │ api.        │      │
│  │ .com        │            │ puzzleforge │            │ puzzleforge │      │
│  │             │            │ .games      │            │ .com        │      │
│  └──────┬──────┘            └──────┬──────┘            └──────┬──────┘      │
│         │                          │                          │             │
│         └──────────────────────────┼──────────────────────────┘             │
│                                    │                                        │
│                                    ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         APPLICATION LAYER                            │   │
│  │                                                                      │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │   │
│  │  │  NEXT.JS APP   │  │  GAME RUNTIME  │  │  AI ENGINE     │         │   │
│  │  │                │  │                │  │                │         │   │
│  │  │ • Creator UI   │  │ • Puzzle Kit   │  │ • Claude API   │         │   │
│  │  │ • Dashboard    │  │   (React UI)   │  │ • OpenAI API   │         │   │
│  │  │ • Admin Panel  │  │ • Phaser.js    │  │ • DALL-E       │         │   │
│  │  │ • Auth (Clerk) │  │   (Gameplay)   │  │ • Orchestrator │         │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                           DATA LAYER                                 │   │
│  │                                                                      │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │   │
│  │  │  POSTGRESQL    │  │  REDIS         │  │  S3 / R2       │         │   │
│  │  │  (Supabase)    │  │  (Upstash)     │  │  (Cloudflare)  │         │   │
│  │  │                │  │                │  │                │         │   │
│  │  │ • Users        │  │ • Sessions     │  │ • Game Assets  │         │   │
│  │  │ • Games        │  │ • Cache        │  │ • User Uploads │         │   │
│  │  │ • Levels       │  │ • Rate Limits  │  │ • Generated    │         │   │
│  │  │ • Analytics    │  │ • Leaderboards │  │   Content      │         │   │
│  │  │ • Transactions │  │ • Real-time    │  │                │         │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                       EXTERNAL SERVICES                              │   │
│  │                                                                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │  Stripe  │ │  AdMob   │ │ Revenue  │ │ PostHog  │ │ Resend   │   │   │
│  │  │ Payments │ │ Ads      │ │ Cat      │ │ Analytics│ │ Email    │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Puzzle Kit (UI Framework) - EXISTING

The foundation already built in this repository:

```
src/
├── components/
│   ├── base/           # Atomic UI (Button, Card, Badge, Modal)
│   ├── composed/       # Complex UI (EventCard, ResourceCounter)
│   ├── menus/          # Pages (Shop, Profile, Team, Settings)
│   ├── modals/         # Dialogs (LevelComplete, Purchase, Rewards)
│   ├── liveops/        # Events (RoyalPass, DailyRewards)
│   └── layout/         # Structure (AppShell, Header, Navigation)
├── store/
│   ├── GameContext     # Player state, progression, resources
│   ├── AdminContext    # Theme, configuration, feature flags
│   └── NavigationContext # Routing, modal stack
├── config/
│   ├── themePresets    # Color schemes
│   ├── game.config     # Balancing, economy
│   ├── registry        # Pages, modals, events registry
│   └── features        # Feature flags
└── tokens/
    ├── colors          # Semantic color system
    └── spacing         # Layout tokens
```

### 2. Phaser.js Game Engines - TO BUILD

Modular puzzle game engines:

```
src/phaser/
├── engines/
│   ├── match3/
│   │   ├── MatchThreeEngine.ts      # Core match-3 logic
│   │   ├── TileManager.ts           # Tile spawning, matching
│   │   ├── BoardRenderer.ts         # Visual rendering
│   │   ├── SpecialTiles.ts          # Bombs, lines, colors
│   │   ├── ComboSystem.ts           # Cascades, multipliers
│   │   └── LevelLoader.ts           # JSON → playable level
│   │
│   ├── word/
│   │   ├── WordEngine.ts            # Core word game logic
│   │   ├── LetterGrid.ts            # Letter placement
│   │   ├── WordValidator.ts         # Dictionary checking
│   │   ├── HintSystem.ts            # Progressive hints
│   │   └── LevelLoader.ts           # JSON → playable level
│   │
│   └── bubble/
│       ├── BubbleEngine.ts          # Bubble shooter logic
│       ├── PhysicsManager.ts        # Trajectory, collisions
│       ├── ClusterDetector.ts       # Match detection
│       └── LevelLoader.ts           # JSON → playable level
│
├── shared/
│   ├── ScoreManager.ts              # Universal scoring
│   ├── ObjectiveTracker.ts          # Goal completion
│   ├── BoosterManager.ts            # Power-up handling
│   ├── AnimationLibrary.ts          # Common animations
│   └── AudioManager.ts              # Sound effects, music
│
├── bridge/
│   ├── PhaserReactBridge.tsx        # React ↔ Phaser communication
│   ├── EventEmitter.ts              # Game events to UI
│   └── ConfigInjector.ts            # Dynamic config loading
│
└── types/
    ├── LevelConfig.ts               # Level structure types
    ├── GameEvents.ts                # Event type definitions
    └── ThemeConfig.ts               # Visual theme types
```

### 3. AI Engine - TO BUILD

Orchestrated AI generation system:

```
src/ai/
├── orchestrator/
│   ├── AIOrchestrator.ts            # Main AI coordinator
│   ├── ProviderRouter.ts            # Claude vs GPT routing
│   ├── CostOptimizer.ts             # Token/cost management
│   └── ResponseValidator.ts         # Schema validation
│
├── generators/
│   ├── ThemeGenerator.ts            # Colors, typography, mood
│   ├── LevelGenerator.ts            # Level configurations
│   ├── ContentGenerator.ts          # Names, descriptions, stories
│   ├── AssetGenerator.ts            # Icons, tiles (via DALL-E)
│   ├── EconomyGenerator.ts          # Shop items, pricing
│   └── EventGenerator.ts            # LiveOps events
│
├── prompts/
│   ├── system/
│   │   ├── theme.prompt.md          # Theme generation instructions
│   │   ├── level.prompt.md          # Level design instructions
│   │   └── content.prompt.md        # Content writing instructions
│   └── templates/
│       ├── match3Level.json         # Match-3 level schema
│       ├── wordLevel.json           # Word game level schema
│       └── themeConfig.json         # Theme configuration schema
│
├── cache/
│   ├── SemanticCache.ts             # Similar prompt deduplication
│   ├── ResultCache.ts               # Generated content cache
│   └── EmbeddingIndex.ts            # Prompt similarity search
│
└── schemas/
    ├── ThemeSchema.ts               # Zod schema for themes
    ├── LevelSchema.ts               # Zod schema for levels
    └── GameConfigSchema.ts          # Zod schema for full game
```

### 4. Multi-Tenant Platform - TO BUILD

```
src/platform/
├── auth/
│   ├── ClerkProvider.tsx            # Authentication wrapper
│   ├── CreatorGuard.tsx             # Creator route protection
│   └── PlayerSession.ts             # Anonymous/guest players
│
├── tenancy/
│   ├── GameResolver.ts              # Subdomain → game config
│   ├── ConfigLoader.ts              # Load game from DB
│   └── AssetResolver.ts             # Resolve game assets
│
├── dashboard/
│   ├── pages/
│   │   ├── MyGames.tsx              # Creator's game list
│   │   ├── CreateGame.tsx           # AI game creation wizard
│   │   ├── EditGame.tsx             # Game configuration
│   │   ├── Analytics.tsx            # Performance metrics
│   │   └── Earnings.tsx             # Revenue dashboard
│   └── components/
│       ├── AIChat.tsx               # Conversational game builder
│       ├── LivePreview.tsx          # Real-time game preview
│       ├── ThemeEditor.tsx          # Visual theme customization
│       └── LevelEditor.tsx          # Level management
│
├── monetization/
│   ├── StripeIntegration.ts         # Creator subscriptions
│   ├── AdManager.ts                 # Ad network integration
│   ├── IAPHandler.ts                # In-app purchase processing
│   └── RevenueCalculator.ts         # Revenue split computation
│
└── api/
    ├── games/
    │   ├── create.ts                # POST /api/games
    │   ├── update.ts                # PATCH /api/games/:id
    │   ├── publish.ts               # POST /api/games/:id/publish
    │   └── delete.ts                # DELETE /api/games/:id
    ├── ai/
    │   ├── generate.ts              # POST /api/ai/generate
    │   ├── refine.ts                # POST /api/ai/refine
    │   └── assets.ts                # POST /api/ai/assets
    └── analytics/
        ├── events.ts                # POST /api/analytics/events
        └── revenue.ts               # GET /api/analytics/revenue
```

## Database Schema

```sql
-- Core Tables

CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  subscription_tier TEXT DEFAULT 'free', -- free, pro, enterprise
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id),
  slug TEXT UNIQUE NOT NULL, -- subdomain: {slug}.puzzleforge.games
  name TEXT NOT NULL,
  description TEXT,
  game_type TEXT NOT NULL, -- match3, word, bubble
  status TEXT DEFAULT 'draft', -- draft, published, archived

  -- AI-Generated Configuration (JSONB for flexibility)
  theme_config JSONB NOT NULL,
  game_config JSONB NOT NULL,
  economy_config JSONB NOT NULL,
  content_config JSONB NOT NULL,

  -- Monetization
  monetization_enabled BOOLEAN DEFAULT false,
  ad_config JSONB,
  iap_config JSONB,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

CREATE TABLE levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  level_number INTEGER NOT NULL,
  name TEXT,
  config JSONB NOT NULL, -- Level-specific configuration
  difficulty TEXT, -- easy, medium, hard, expert
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(game_id, level_number)
);

CREATE TABLE game_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL, -- icon, tile, background, sound
  asset_key TEXT NOT NULL, -- Reference key in game
  storage_url TEXT NOT NULL, -- S3/R2 URL
  is_ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(game_id, asset_type, asset_key)
);

-- Player Data (per game)

CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  device_id TEXT, -- Anonymous players
  user_id UUID, -- Logged-in players (future)
  display_name TEXT,

  -- Progress
  current_level INTEGER DEFAULT 1,
  total_stars INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 0,

  -- Engagement
  first_played_at TIMESTAMPTZ DEFAULT NOW(),
  last_played_at TIMESTAMPTZ DEFAULT NOW(),
  total_sessions INTEGER DEFAULT 1,
  total_playtime_seconds INTEGER DEFAULT 0,

  UNIQUE(game_id, device_id)
);

CREATE TABLE player_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  level_id UUID REFERENCES levels(id),
  stars_earned INTEGER DEFAULT 0,
  high_score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,

  UNIQUE(player_id, level_id)
);

-- Analytics & Revenue

CREATE TABLE game_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  date DATE NOT NULL,

  -- Engagement
  daily_active_users INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  sessions INTEGER DEFAULT 0,
  avg_session_duration_seconds INTEGER DEFAULT 0,

  -- Monetization
  ad_impressions INTEGER DEFAULT 0,
  ad_revenue_cents INTEGER DEFAULT 0,
  iap_transactions INTEGER DEFAULT 0,
  iap_revenue_cents INTEGER DEFAULT 0,

  UNIQUE(game_id, date)
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id),
  player_id UUID REFERENCES players(id),
  type TEXT NOT NULL, -- ad_view, iap_purchase
  amount_cents INTEGER NOT NULL,
  platform_share_cents INTEGER NOT NULL,
  creator_share_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'completed',
  external_id TEXT, -- Stripe/AdMob reference
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_games_creator ON games(creator_id);
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_levels_game ON levels(game_id);
CREATE INDEX idx_players_game ON players(game_id);
CREATE INDEX idx_analytics_game_date ON game_analytics(game_id, date);
```

---

# 6. AI Integration Deep Dive

## Core Principle: AI-Native Architecture

Every component in PuzzleForge is designed to be AI-manipulable through structured schemas.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AI-NATIVE DESIGN PRINCIPLE                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  TRADITIONAL APP                    PUZZLEFORGE                         │
│  ═══════════════                    ═══════════                         │
│                                                                         │
│  Hard-coded colors:                 Tokenized colors:                   │
│  background: #FF5733              → theme.colors.primary: AI-generated  │
│                                                                         │
│  Fixed levels:                      Parameterized levels:               │
│  Level 1: {...hardcoded}          → levels[0]: AI-generated config      │
│                                                                         │
│  Static content:                    Dynamic content:                    │
│  "Welcome to Game!"               → content.welcome: AI-generated       │
│                                                                         │
│  Bundled assets:                    Referenced assets:                  │
│  import icon from './icon.png'    → assets.icons.home: AI-generated URL │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## AI Generation Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      AI GENERATION PIPELINE                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  USER INPUT                                                             │
│  ══════════                                                             │
│  "Create a space-themed match-3 with neon colors and alien tiles"       │
│                                                                         │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     PROMPT PREPROCESSOR                           │  │
│  │                                                                   │  │
│  │  1. Intent Classification: "game_creation"                        │  │
│  │  2. Entity Extraction: {theme: "space", style: "neon",            │  │
│  │                         gameType: "match3", tiles: "alien"}       │  │
│  │  3. Context Enrichment: Add platform constraints, best practices  │  │
│  │  4. Schema Selection: match3GameSchema                            │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                      AI ORCHESTRATOR                              │  │
│  │                                                                   │  │
│  │  Parallel Generation:                                             │  │
│  │                                                                   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │  │
│  │  │   CLAUDE    │  │   CLAUDE    │  │   DALL-E    │               │  │
│  │  │   Sonnet    │  │   Sonnet    │  │     3       │               │  │
│  │  │             │  │             │  │             │               │  │
│  │  │ Theme +     │  │ Levels +    │  │ Tile        │               │  │
│  │  │ Content     │  │ Economy     │  │ Sprites     │               │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘               │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    RESPONSE PROCESSOR                             │  │
│  │                                                                   │  │
│  │  1. Schema Validation: Ensure all required fields present         │  │
│  │  2. Constraint Checking: Values within acceptable ranges          │  │
│  │  3. Asset Processing: Upload generated images to CDN              │  │
│  │  4. Conflict Resolution: Merge parallel results                   │  │
│  │  5. Optimization: Remove redundancy, compress configs             │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                      GAME CONFIG                                  │  │
│  │                                                                   │  │
│  │  {                                                                │  │
│  │    "id": "space-match-abc123",                                    │  │
│  │    "name": "Galaxy Gems",                                         │  │
│  │    "theme": {                                                     │  │
│  │      "colors": {                                                  │  │
│  │        "primary": "#00FFFF",                                      │  │
│  │        "secondary": "#FF00FF",                                    │  │
│  │        "background": "#0a0a1a"                                    │  │
│  │      }                                                            │  │
│  │    },                                                             │  │
│  │    "levels": [...50 levels...],                                   │  │
│  │    "assets": {                                                    │  │
│  │      "tiles": ["cdn.url/alien1.png", ...]                         │  │
│  │    }                                                              │  │
│  │  }                                                                │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Real-Time Refinement System

The key innovation: **instant, targeted updates via prompt**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    REAL-TIME REFINEMENT                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  SCENARIO: Creator wants to change color palette                        │
│  ════════════════════════════════════════════════                       │
│                                                                         │
│  Creator: "Change colors to warm sunset - oranges, pinks, purples"      │
│                                                                         │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     CHANGE DETECTOR                               │  │
│  │                                                                   │  │
│  │  Intent: "theme_color_change"                                     │  │
│  │  Scope: theme.colors only (not levels, not assets)                │  │
│  │  Strategy: TARGETED_UPDATE (not full regeneration)                │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     MINIMAL AI CALL                               │  │
│  │                                                                   │  │
│  │  Prompt: "Generate sunset color palette: primary, secondary,      │  │
│  │           background, accent, text colors. JSON only."            │  │
│  │                                                                   │  │
│  │  Model: Claude Haiku (fast, cheap)                                │  │
│  │  Tokens: ~200 (vs ~2000 for full generation)                      │  │
│  │  Latency: ~300ms                                                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     INSTANT UPDATE                                │  │
│  │                                                                   │  │
│  │  1. Validate new colors against schema                            │  │
│  │  2. Merge into existing gameConfig.theme.colors                   │  │
│  │  3. Broadcast to preview via WebSocket                            │  │
│  │  4. Preview updates in <500ms total                               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════    │
│                                                                         │
│  SCENARIO: Creator uploads custom icon set                              │
│  ═════════════════════════════════════════                              │
│                                                                         │
│  Creator: [Uploads 6 PNG icons]                                         │
│                                                                         │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     ASSET PROCESSOR                               │  │
│  │                                                                   │  │
│  │  1. Upload to CDN (Cloudflare R2)                                 │  │
│  │  2. Generate optimized variants (1x, 2x, 3x)                      │  │
│  │  3. Update gameConfig.assets.icons                                │  │
│  │  4. No AI call needed - direct replacement                        │  │
│  │  5. Preview updates instantly                                     │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════    │
│                                                                         │
│  SCENARIO: Creator asks for harder levels                               │
│  ════════════════════════════════════════                               │
│                                                                         │
│  Creator: "Make levels 20-30 much harder with less moves"               │
│                                                                         │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     LEVEL ADJUSTER                                │  │
│  │                                                                   │  │
│  │  1. Identify affected levels: levels[19] through levels[29]       │  │
│  │  2. Current avg moves: 25, target: reduce by 20%                  │  │
│  │  3. AI regenerates only those 10 levels                           │  │
│  │  4. Preserves overall progression curve                           │  │
│  │  5. Updates merged into gameConfig.levels                         │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## AI Provider Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AI PROVIDER ROUTING                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  TASK                          PROVIDER           REASON                │
│  ════                          ════════           ══════                │
│                                                                         │
│  Full game generation          Claude Sonnet      Best reasoning        │
│  Level design                  Claude Sonnet      Complex logic         │
│  Content writing               Claude Sonnet      Creative quality      │
│  Theme colors                  Claude Haiku       Fast, simple          │
│  Quick refinements             Claude Haiku       Low latency           │
│  Icon generation               DALL-E 3           Best quality          │
│  Tile sprite generation        DALL-E 3           Consistency           │
│  Background generation         DALL-E 3           Quality               │
│  Fallback (Claude down)        GPT-4              Redundancy            │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  COST OPTIMIZATION                                                      │
│  ════════════════                                                       │
│                                                                         │
│  1. Semantic Caching                                                    │
│     "blue ocean theme" ≈ "sea colors" ≈ "aquatic palette"               │
│     → Cache hit if similar prompt seen before                           │
│     → Estimated 60% reduction in API calls                              │
│                                                                         │
│  2. Incremental Generation                                              │
│     Only regenerate what changed, not entire game                       │
│     → Estimated 70% reduction in tokens per refinement                  │
│                                                                         │
│  3. Pre-generation                                                      │
│     Popular themes pre-generated at build time                          │
│     → Zero latency for common requests                                  │
│                                                                         │
│  4. Model Tiering                                                       │
│     Use cheapest model that meets quality threshold                     │
│     → Haiku: $0.25/M tokens vs Sonnet: $3/M tokens                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Structured Output Schemas

```typescript
// Theme Generation Schema
const ThemeSchema = z.object({
  name: z.string().describe("Theme name like 'Ocean Breeze'"),
  mood: z.string().describe("Emotional tone: cozy, exciting, mysterious"),
  colors: z.object({
    primary: z.string().regex(/^#[0-9A-F]{6}$/i),
    secondary: z.string().regex(/^#[0-9A-F]{6}$/i),
    accent: z.string().regex(/^#[0-9A-F]{6}$/i),
    background: z.string().regex(/^#[0-9A-F]{6}$/i),
    surface: z.string().regex(/^#[0-9A-F]{6}$/i),
    text: z.object({
      primary: z.string().regex(/^#[0-9A-F]{6}$/i),
      secondary: z.string().regex(/^#[0-9A-F]{6}$/i),
      muted: z.string().regex(/^#[0-9A-F]{6}$/i),
    }),
  }),
  typography: z.object({
    fontFamily: z.string(),
    headingWeight: z.enum(["normal", "medium", "semibold", "bold"]),
  }),
  borders: z.object({
    radius: z.enum(["none", "sm", "md", "lg", "full"]),
    width: z.enum(["none", "thin", "medium"]),
  }),
});

// Match-3 Level Schema
const Match3LevelSchema = z.object({
  levelNumber: z.number().int().positive(),
  name: z.string().max(30),
  grid: z.object({
    width: z.number().int().min(5).max(12),
    height: z.number().int().min(5).max(12),
    blockedCells: z.array(z.tuple([z.number(), z.number()])),
  }),
  objectives: z.array(z.object({
    type: z.enum(["score", "collect", "clear", "drop"]),
    target: z.union([z.string(), z.number()]),
    count: z.number().int().positive(),
  })),
  moves: z.number().int().min(5).max(100),
  starThresholds: z.tuple([z.number(), z.number(), z.number()]),
  availableTiles: z.array(z.string()).min(3).max(8),
  specialTileChance: z.number().min(0).max(0.3),
  difficulty: z.enum(["easy", "medium", "hard", "expert"]),
});

// Word Game Level Schema
const WordLevelSchema = z.object({
  levelNumber: z.number().int().positive(),
  name: z.string().max(30),
  gridType: z.enum(["crossword", "wordsearch", "anagram", "connect"]),
  letters: z.array(z.string().length(1)),
  words: z.array(z.object({
    word: z.string(),
    hint: z.string().optional(),
    bonus: z.boolean().default(false),
  })),
  timeLimit: z.number().int().optional(),
  hintsAvailable: z.number().int().default(3),
  difficulty: z.enum(["easy", "medium", "hard", "expert"]),
});
```

---

# 7. MVP Specification

## MVP Scope Definition

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         MVP SCOPE                                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ✅ IN SCOPE (MVP)                      ❌ OUT OF SCOPE (Post-MVP)      │
│  ════════════════                       ══════════════════════          │
│                                                                         │
│  Game Types:                            Game Types:                     │
│  ✅ Match-3                             ❌ Bubble shooter               │
│  ✅ Word games (basic)                  ❌ Solitaire                    │
│                                         ❌ Sudoku variants              │
│                                         ❌ Physics puzzles              │
│                                                                         │
│  AI Generation:                         AI Generation:                  │
│  ✅ Theme/colors                        ❌ Sound/music generation       │
│  ✅ Level configurations                ❌ Custom game mechanics        │
│  ✅ Content (names, text)               ❌ Video/animation generation   │
│  ✅ Basic icon selection                                                │
│  ⚠️ Icon generation (limited)                                          │
│                                                                         │
│  Platform:                              Platform:                       │
│  ✅ Creator accounts                    ❌ Team workspaces              │
│  ✅ Game creation wizard                ❌ Version control              │
│  ✅ Live preview                        ❌ A/B testing                  │
│  ✅ Publish to subdomain                ❌ Custom domains               │
│  ✅ Basic analytics                     ❌ Advanced analytics           │
│                                                                         │
│  Monetization:                          Monetization:                   │
│  ✅ Rewarded video ads                  ❌ Subscriptions (player)       │
│  ✅ Interstitial ads                    ❌ Branded content              │
│  ✅ Basic IAP (coin packs)              ❌ NFT integration              │
│  ✅ Creator revenue dashboard           ❌ Crypto payments              │
│                                                                         │
│  Social:                                Social:                         │
│  ✅ Leaderboards (per game)             ❌ Cross-game profiles          │
│  ✅ Share to social media               ❌ Friends system               │
│  ⚠️ Daily rewards                       ❌ Teams/guilds                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## MVP User Stories

### Creator Stories

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CREATOR USER STORIES                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ACCOUNT                                                                │
│  C1: As a creator, I can sign up with email/Google/Apple                │
│  C2: As a creator, I can see my dashboard with all my games             │
│  C3: As a creator, I can upgrade to Pro for more features               │
│                                                                         │
│  GAME CREATION                                                          │
│  C4: As a creator, I can describe my game idea in natural language      │
│  C5: As a creator, I can choose from Match-3 or Word game types         │
│  C6: As a creator, I can see AI generate my game in real-time           │
│  C7: As a creator, I can preview my game on simulated device            │
│                                                                         │
│  CUSTOMIZATION                                                          │
│  C8: As a creator, I can refine colors via prompt or color picker       │
│  C9: As a creator, I can upload my own icons/logo                       │
│  C10: As a creator, I can adjust level difficulty via sliders           │
│  C11: As a creator, I can edit game name, description, and content      │
│  C12: As a creator, I can request AI to regenerate specific elements    │
│                                                                         │
│  MONETIZATION                                                           │
│  C13: As a creator, I can enable/disable different ad types             │
│  C14: As a creator, I can configure IAP products and prices             │
│  C15: As a creator, I can see my earnings in real-time                  │
│  C16: As a creator, I can request payout when threshold is met          │
│                                                                         │
│  PUBLISHING                                                             │
│  C17: As a creator, I can publish my game to a unique URL               │
│  C18: As a creator, I can update my game after publishing               │
│  C19: As a creator, I can unpublish/archive my game                     │
│  C20: As a creator, I can share my game via social media                │
│                                                                         │
│  ANALYTICS                                                              │
│  C21: As a creator, I can see daily active players                      │
│  C22: As a creator, I can see level completion rates                    │
│  C23: As a creator, I can see revenue breakdown by source               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Player Stories

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     PLAYER USER STORIES                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  DISCOVERY                                                              │
│  P1: As a player, I can access a game via shared link                   │
│  P2: As a player, I can play instantly without download                 │
│  P3: As a player, I can add game to home screen (PWA)                   │
│                                                                         │
│  GAMEPLAY                                                               │
│  P4: As a player, I can play match-3 levels with smooth animations      │
│  P5: As a player, I can play word game levels                           │
│  P6: As a player, I can use boosters to help complete levels            │
│  P7: As a player, I can earn stars based on performance                 │
│                                                                         │
│  PROGRESSION                                                            │
│  P8: As a player, I can see my progress through level map               │
│  P9: As a player, I can unlock new areas as I progress                  │
│  P10: As a player, my progress is saved automatically                   │
│                                                                         │
│  ECONOMY                                                                │
│  P11: As a player, I can earn coins by completing levels                │
│  P12: As a player, I can watch ads for extra coins/lives                │
│  P13: As a player, I can purchase coin packs via IAP                    │
│  P14: As a player, I can buy boosters from the shop                     │
│                                                                         │
│  SOCIAL                                                                 │
│  P15: As a player, I can see my rank on leaderboard                     │
│  P16: As a player, I can share my score to social media                 │
│  P17: As a player, I can claim daily login rewards                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## MVP Feature Matrix

| Feature | Free Tier | Pro Tier ($29/mo) | Enterprise |
|---------|-----------|-------------------|------------|
| Games created | 2 | Unlimited | Unlimited |
| AI generations/month | 50 | 500 | Unlimited |
| Levels per game | 30 | 100 | Unlimited |
| Custom icons upload | ❌ | ✅ | ✅ |
| AI icon generation | ❌ | ✅ | ✅ |
| Remove PuzzleForge branding | ❌ | ✅ | ✅ |
| Ad revenue share | 50% | 70% | 80% |
| IAP revenue share | 50% | 70% | 85% |
| Analytics | Basic | Advanced | Advanced + Export |
| Support | Community | Email | Dedicated |
| Custom domain | ❌ | ❌ | ✅ |

## MVP Technical Requirements

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Game load time | < 3 seconds | Time to interactive |
| AI generation time | < 30 seconds | Full game generation |
| AI refinement time | < 2 seconds | Single property change |
| Gameplay FPS | 60 FPS | Phaser rendering |
| Time to first level | < 5 seconds | After game loads |

### Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Safari | 14+ |
| Firefox | 90+ |
| Edge | 90+ |
| Mobile Safari | iOS 14+ |
| Chrome Android | 90+ |

### Device Support

| Device | Status |
|--------|--------|
| iPhone (iOS 14+) | Full support |
| Android phones | Full support |
| iPad | Full support |
| Android tablets | Full support |
| Desktop browsers | Full support |
| Smart TVs | Not supported (MVP) |

---

# 8. Platform Economics

## Revenue Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      REVENUE STREAMS                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. CREATOR SUBSCRIPTIONS (B2B SaaS)                                    │
│  ══════════════════════════════════                                     │
│                                                                         │
│  Free          $0/month     Limited features, 50% revenue share         │
│  Pro           $29/month    Full features, 70% revenue share            │
│  Enterprise    $199/month   Custom, 85% revenue share                   │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  2. REVENUE SHARE (Transaction Fee)                                     │
│  ══════════════════════════════════                                     │
│                                                                         │
│  Ad Revenue:   Platform takes 30-50% of ad earnings                     │
│  IAP Revenue:  Platform takes 15-50% after app store fees               │
│                                                                         │
│  Example:                                                               │
│  • Player buys $9.99 coin pack                                          │
│  • App store takes ~30% = $3.00                                         │
│  • Remaining: $6.99                                                     │
│  • Platform takes 30% = $2.10                                           │
│  • Creator receives: $4.89                                              │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  3. PREMIUM FEATURES (Add-ons)                                          │
│  ═════════════════════════════                                          │
│                                                                         │
│  • Extra AI generations: $10 for 100 generations                        │
│  • Premium asset packs: $5-20 per pack                                  │
│  • Custom domain: $10/month                                             │
│  • White-label (no branding): $50/month                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Unit Economics

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      UNIT ECONOMICS                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  CREATOR ACQUISITION                                                    │
│  ══════════════════                                                     │
│                                                                         │
│  CAC (Customer Acquisition Cost):        $20-50                         │
│  Conversion Rate (Free → Pro):           5-10%                          │
│  Avg Revenue Per Creator (Monthly):      $15 (blended)                  │
│  LTV (12-month):                         $180                           │
│  LTV:CAC Ratio:                          3.6-9x ✅                      │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  COST STRUCTURE (Per Creator/Month)                                     │
│  ═════════════════════════════════                                      │
│                                                                         │
│  AI API Costs:                                                          │
│  • Avg 20 generations/month @ $0.05 each = $1.00                        │
│  • Refinements (100/month) @ $0.005 each = $0.50                        │
│  • Total AI: ~$1.50/creator/month                                       │
│                                                                         │
│  Infrastructure:                                                        │
│  • Hosting (Vercel): ~$0.10/creator/month                               │
│  • Database (Supabase): ~$0.05/creator/month                            │
│  • CDN/Storage: ~$0.10/creator/month                                    │
│  • Total Infra: ~$0.25/creator/month                                    │
│                                                                         │
│  Total Variable Cost: ~$1.75/creator/month                              │
│  Gross Margin: ~88% ✅                                                  │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  PLAYER MONETIZATION (Per Game)                                         │
│  ═════════════════════════════                                          │
│                                                                         │
│  Industry Benchmarks (Puzzle Games):                                    │
│  • ARPDAU (Avg Rev Per Daily Active User): $0.05-0.15                   │
│  • Day 1 Retention: 40-50%                                              │
│  • Day 7 Retention: 15-25%                                              │
│  • Day 30 Retention: 5-10%                                              │
│  • Payer Conversion: 2-5%                                               │
│                                                                         │
│  Example Game (1000 DAU):                                               │
│  • Daily Revenue: $50-150                                               │
│  • Monthly Revenue: $1,500-4,500                                        │
│  • Platform Share (30%): $450-1,350                                     │
│  • Creator Earnings: $1,050-3,150                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Financial Projections (3 Year)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FINANCIAL PROJECTIONS                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                          Year 1      Year 2      Year 3                 │
│  ════════════════════════════════════════════════════════               │
│                                                                         │
│  CREATORS                                                               │
│  Total Creators          1,000       5,000       15,000                 │
│  Paid Creators (10%)     100         500         1,500                  │
│  Enterprise (2%)         20          100         300                    │
│                                                                         │
│  SUBSCRIPTION REVENUE                                                   │
│  Pro ($29/mo)            $34,800     $174,000    $522,000               │
│  Enterprise ($199/mo)    $47,760     $238,800    $716,400               │
│  Total Subscriptions     $82,560     $412,800    $1,238,400             │
│                                                                         │
│  TRANSACTION REVENUE                                                    │
│  Total GMV (Games)       $500K       $5M         $25M                   │
│  Platform Share (30%)    $150,000    $1,500,000  $7,500,000             │
│                                                                         │
│  TOTAL REVENUE           $232,560    $1,912,800  $8,738,400             │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  COSTS                                                                  │
│  AI API                  $18,000     $90,000     $270,000               │
│  Infrastructure          $12,000     $60,000     $180,000               │
│  Team (see below)        $300,000    $600,000    $1,200,000             │
│  Marketing               $50,000     $200,000    $500,000               │
│  Other                   $20,000     $50,000     $100,000               │
│  Total Costs             $400,000    $1,000,000  $2,250,000             │
│                                                                         │
│  NET INCOME              ($167,440)  $912,800    $6,488,400             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 9. Roadmap

## Development Timeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT ROADMAP                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  PHASE 0: FOUNDATION (Weeks 1-4)                                        │
│  ═══════════════════════════════                                        │
│  Already Complete: Puzzle Kit UI Framework ✅                           │
│                                                                         │
│  Week 1-2: Phaser Integration                                           │
│  • Set up Phaser.js in Next.js                                          │
│  • Create React ↔ Phaser bridge                                         │
│  • Basic tile rendering                                                 │
│                                                                         │
│  Week 3-4: Match-3 Core                                                 │
│  • Grid system with tile management                                     │
│  • Match detection (3, 4, 5 in a row)                                   │
│  • Basic swap mechanics                                                 │
│  • Tile falling/refilling                                               │
│                                                                         │
│  Deliverable: Playable match-3 prototype                                │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  PHASE 1: CORE ENGINE (Weeks 5-10)                                      │
│  ═════════════════════════════════                                      │
│                                                                         │
│  Week 5-6: Match-3 Polish                                               │
│  • Special tiles (bomb, line clear, rainbow)                            │
│  • Cascade/combo system                                                 │
│  • Score calculation                                                    │
│  • Objectives system                                                    │
│                                                                         │
│  Week 7-8: Level System                                                 │
│  • JSON-based level configuration                                       │
│  • Level loader                                                         │
│  • Star rating system                                                   │
│  • Win/lose conditions                                                  │
│                                                                         │
│  Week 9-10: UI Integration                                              │
│  • Connect Phaser to Puzzle Kit UI                                      │
│  • Level complete/fail modals                                           │
│  • Booster integration                                                  │
│  • Lives system                                                         │
│                                                                         │
│  Deliverable: Full match-3 game with 20 levels                          │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  PHASE 2: AI INTEGRATION (Weeks 11-16)                                  │
│  ═════════════════════════════════════                                  │
│                                                                         │
│  Week 11-12: AI Infrastructure                                          │
│  • AI orchestrator setup                                                │
│  • Claude/OpenAI integration                                            │
│  • Structured output schemas                                            │
│  • Response validation                                                  │
│                                                                         │
│  Week 13-14: Theme Generation                                           │
│  • Color palette generation                                             │
│  • Real-time theme application                                          │
│  • Theme refinement via prompt                                          │
│  • Icon recommendation system                                           │
│                                                                         │
│  Week 15-16: Level Generation                                           │
│  • AI level configuration generator                                     │
│  • Difficulty balancing                                                 │
│  • Content generation (names, areas)                                    │
│  • Batch level generation                                               │
│                                                                         │
│  Deliverable: AI-generated match-3 games                                │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  PHASE 3: PLATFORM (Weeks 17-22)                                        │
│  ═════════════════════════════════                                      │
│                                                                         │
│  Week 17-18: Authentication & Multi-tenancy                             │
│  • Clerk authentication setup                                           │
│  • Creator accounts                                                     │
│  • Game ownership model                                                 │
│  • Subdomain routing                                                    │
│                                                                         │
│  Week 19-20: Creator Dashboard                                          │
│  • Game creation wizard                                                 │
│  • Live preview system                                                  │
│  • Game management (edit, publish, archive)                             │
│  • Settings and configuration                                           │
│                                                                         │
│  Week 21-22: Publishing System                                          │
│  • Deploy game to subdomain                                             │
│  • PWA configuration                                                    │
│  • Share functionality                                                  │
│  • Basic analytics                                                      │
│                                                                         │
│  Deliverable: Creators can make and publish games                       │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  PHASE 4: MONETIZATION (Weeks 23-26)                                    │
│  ═════════════════════════════════════                                  │
│                                                                         │
│  Week 23-24: Ads Integration                                            │
│  • AdMob/IronSource setup                                               │
│  • Rewarded video ads                                                   │
│  • Interstitial ads                                                     │
│  • Ad frequency configuration                                           │
│                                                                         │
│  Week 25-26: IAP & Payments                                             │
│  • Stripe integration                                                   │
│  • IAP product configuration                                            │
│  • Creator payout system                                                │
│  • Revenue dashboard                                                    │
│                                                                         │
│  Deliverable: MVP Ready for Launch 🚀                                   │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  PHASE 5: POST-MVP (Months 7-12)                                        │
│  ════════════════════════════════                                       │
│                                                                         │
│  • Word game engine                                                     │
│  • Advanced analytics                                                   │
│  • Social features (teams, friends)                                     │
│  • LiveOps event system                                                 │
│  • Asset generation (DALL-E tiles)                                      │
│  • Mobile app wrapper (Capacitor)                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Milestone Summary

| Milestone | Timeline | Deliverable |
|-----------|----------|-------------|
| M1: Playable Prototype | Week 4 | Match-3 game working in browser |
| M2: Full Game | Week 10 | Complete game with UI, 20 levels |
| M3: AI Generation | Week 16 | AI-generated themes and levels |
| M4: Platform MVP | Week 22 | Creator accounts, publishing |
| M5: Monetization | Week 26 | Ads, IAP, revenue sharing |
| M6: Word Games | Month 8 | Second game type |
| M7: Scale | Month 12 | 1000+ creators, stable platform |

---

# 10. Future Vision: Universal Game Currency

## The "Forge Coin" Concept

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FUTURE: UNIVERSAL GAME CURRENCY                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  VISION (18-24 Months)                                                  │
│  ═════════════════════                                                  │
│                                                                         │
│  "Forge Coins" - A universal currency that works across ALL             │
│  PuzzleForge games. Players earn and spend across the ecosystem.        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │    GAME A              GAME B              GAME C               │   │
│  │   (Match-3)           (Word)            (Bubble)               │   │
│  │      │                  │                  │                    │   │
│  │      └──────────────────┼──────────────────┘                    │   │
│  │                         │                                       │   │
│  │                         ▼                                       │   │
│  │              ┌─────────────────────┐                            │   │
│  │              │    FORGE COINS      │                            │   │
│  │              │    (Universal)      │                            │   │
│  │              └─────────────────────┘                            │   │
│  │                         │                                       │   │
│  │         ┌───────────────┼───────────────┐                       │   │
│  │         ▼               ▼               ▼                       │   │
│  │   ┌──────────┐   ┌──────────┐   ┌──────────┐                    │   │
│  │   │Buy items │   │ Transfer │   │ Cash out │                    │   │
│  │   │ in any   │   │ between  │   │ (future) │                    │   │
│  │   │  game    │   │  games   │   │          │                    │   │
│  │   └──────────┘   └──────────┘   └──────────┘                    │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  PLAYER BENEFITS                                                        │
│  ══════════════                                                         │
│  • Earn coins in favorite game, spend in any game                       │
│  • Progress feels valuable across platform                              │
│  • Discovery: Try new games with existing currency                      │
│                                                                         │
│  CREATOR BENEFITS                                                       │
│  ═══════════════                                                        │
│  • Players arrive with spending power                                   │
│  • Cross-promotion between games                                        │
│  • Reduced friction for monetization                                    │
│                                                                         │
│  PLATFORM BENEFITS                                                      │
│  ════════════════                                                       │
│  • Increased player retention (invested in ecosystem)                   │
│  • Network effects (more games = more valuable coins)                   │
│  • Potential for token economics (future)                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Blockchain Integration (Long-term Vision)

```
┌─────────────────────────────────────────────────────────────────────────┐
│              POTENTIAL BLOCKCHAIN INTEGRATION (2+ Years)                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  NOTE: This is long-term vision, NOT MVP scope                          │
│                                                                         │
│  PHASE 1: Centralized Currency                                          │
│  • Forge Coins stored in platform database                              │
│  • Standard web2 implementation                                         │
│  • No blockchain complexity                                             │
│                                                                         │
│  PHASE 2: Optional Web3 Integration                                     │
│  • Bridge to blockchain (Base, Polygon, or similar L2)                  │
│  • Players can optionally "withdraw" to wallet                          │
│  • Enables trading, DeFi integration                                    │
│                                                                         │
│  PHASE 3: Creator Tokens                                                │
│  • Creators can launch game-specific tokens                             │
│  • Fans can "invest" in favorite creators                               │
│  • Revenue sharing via smart contracts                                  │
│                                                                         │
│  IMPORTANT CONSIDERATIONS                                               │
│  ════════════════════════                                               │
│  • Regulatory compliance (not a security)                               │
│  • User experience (web2 feel, web3 optional)                           │
│  • Sustainability (not speculative)                                     │
│  • Platform control (prevent manipulation)                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Platform Evolution

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    LONG-TERM PLATFORM VISION                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  YEAR 1: Puzzle Games                                                   │
│  • Match-3, Word, Bubble shooters                                       │
│  • Web-based, PWA                                                       │
│  • Creator tools + monetization                                         │
│                                                                         │
│  YEAR 2: Expanded Casual                                                │
│  • Card games (Solitaire, etc.)                                         │
│  • Board games (Chess, Checkers)                                        │
│  • Trivia/Quiz games                                                    │
│  • Mobile apps (iOS/Android via Capacitor)                              │
│  • Universal currency                                                   │
│                                                                         │
│  YEAR 3: Platform Effects                                               │
│  • Game discovery marketplace                                           │
│  • Creator collaboration tools                                          │
│  • Advanced AI (custom mechanics)                                       │
│  • API for third-party integrations                                     │
│  • Potential blockchain integration                                     │
│                                                                         │
│  YEAR 4+: "Roblox for Casual"                                           │
│  • Full game creation platform                                          │
│  • User-generated assets                                                │
│  • Social gaming layer                                                  │
│  • Creator economy at scale                                             │
│  • Potential IPO / major exit                                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 11. Technical Implementation Details

## Phaser.js Integration Architecture

```typescript
// src/phaser/bridge/PhaserReactBridge.tsx

import { useEffect, useRef, useCallback } from 'react';
import Phaser from 'phaser';
import { GameConfig, LevelConfig, ThemeConfig } from '@/types/game';

interface PhaserGameProps {
  gameType: 'match3' | 'word' | 'bubble';
  levelConfig: LevelConfig;
  themeConfig: ThemeConfig;
  boosters: Booster[];
  onLevelComplete: (result: LevelResult) => void;
  onLevelFail: (reason: string) => void;
  onScoreUpdate: (score: number) => void;
  onMovesUpdate: (moves: number) => void;
  onBoosterUsed: (boosterId: string) => void;
}

export function PhaserGame({
  gameType,
  levelConfig,
  themeConfig,
  boosters,
  onLevelComplete,
  onLevelFail,
  onScoreUpdate,
  onMovesUpdate,
  onBoosterUsed,
}: PhaserGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  // Initialize Phaser game
  useEffect(() => {
    if (!containerRef.current) return;

    const SceneClass = getSceneForGameType(gameType);

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 390,  // Mobile width
      height: 600, // Game area height
      backgroundColor: themeConfig.colors.background,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: new SceneClass(levelConfig, themeConfig),
    };

    gameRef.current = new Phaser.Game(config);

    // Set up event listeners
    const scene = gameRef.current.scene.scenes[0];
    scene.events.on('levelComplete', onLevelComplete);
    scene.events.on('levelFail', onLevelFail);
    scene.events.on('scoreUpdate', onScoreUpdate);
    scene.events.on('movesUpdate', onMovesUpdate);
    scene.events.on('boosterUsed', onBoosterUsed);

    return () => {
      gameRef.current?.destroy(true);
    };
  }, [gameType, levelConfig.id]); // Re-create on level change

  // Hot-reload theme changes
  useEffect(() => {
    if (!gameRef.current) return;
    const scene = gameRef.current.scene.scenes[0];
    scene.events.emit('themeUpdate', themeConfig);
  }, [themeConfig]);

  // Expose booster activation to React
  const activateBooster = useCallback((boosterId: string) => {
    if (!gameRef.current) return;
    const scene = gameRef.current.scene.scenes[0];
    scene.events.emit('activateBooster', boosterId);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Booster UI overlay (React) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {boosters.map(booster => (
          <BoosterButton
            key={booster.id}
            booster={booster}
            onActivate={() => activateBooster(booster.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

## Match-3 Engine Core

```typescript
// src/phaser/engines/match3/MatchThreeEngine.ts

import Phaser from 'phaser';

interface Tile {
  row: number;
  col: number;
  type: string;
  sprite: Phaser.GameObjects.Sprite;
  special?: 'bomb' | 'line-h' | 'line-v' | 'rainbow';
}

interface Match {
  tiles: Tile[];
  type: 'horizontal' | 'vertical' | 'L' | 'T';
  length: number;
}

export class MatchThreeScene extends Phaser.Scene {
  private grid: (Tile | null)[][];
  private config: LevelConfig;
  private theme: ThemeConfig;
  private selectedTile: Tile | null = null;
  private isProcessing: boolean = false;
  private score: number = 0;
  private movesRemaining: number;
  private objectives: Map<string, { current: number; target: number }>;

  constructor(config: LevelConfig, theme: ThemeConfig) {
    super({ key: 'MatchThreeScene' });
    this.config = config;
    this.theme = theme;
    this.movesRemaining = config.moves;
    this.objectives = new Map();
  }

  preload() {
    // Load tile sprites based on theme
    this.config.availableTiles.forEach(tileType => {
      const assetUrl = this.theme.assets?.tiles?.[tileType]
        || `/assets/tiles/default/${tileType}.png`;
      this.load.image(tileType, assetUrl);
    });

    // Load special tile effects
    this.load.image('bomb', '/assets/effects/bomb.png');
    this.load.image('line-h', '/assets/effects/line-h.png');
    this.load.image('line-v', '/assets/effects/line-v.png');
    this.load.image('rainbow', '/assets/effects/rainbow.png');
  }

  create() {
    this.initializeObjectives();
    this.createGrid();
    this.setupInput();
    this.ensureNoInitialMatches();
  }

  private createGrid() {
    const { width, height, blockedCells } = this.config.grid;
    const blockedSet = new Set(blockedCells.map(([r, c]) => `${r},${c}`));

    this.grid = [];

    for (let row = 0; row < height; row++) {
      this.grid[row] = [];
      for (let col = 0; col < width; col++) {
        if (blockedSet.has(`${row},${col}`)) {
          this.grid[row][col] = null;
          continue;
        }

        const tileType = this.getRandomTileType();
        const tile = this.createTile(row, col, tileType);
        this.grid[row][col] = tile;
      }
    }
  }

  private createTile(row: number, col: number, type: string): Tile {
    const { x, y } = this.gridToScreen(row, col);
    const sprite = this.add.sprite(x, y, type);
    sprite.setInteractive();
    sprite.setTint(parseInt(this.theme.colors.primary.slice(1), 16));

    return { row, col, type, sprite };
  }

  private setupInput() {
    this.input.on('gameobjectdown', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
      if (this.isProcessing) return;

      const tile = this.findTileBySprite(gameObject);
      if (!tile) return;

      if (!this.selectedTile) {
        this.selectedTile = tile;
        this.highlightTile(tile);
      } else {
        if (this.areAdjacent(this.selectedTile, tile)) {
          this.trySwap(this.selectedTile, tile);
        }
        this.unhighlightTile(this.selectedTile);
        this.selectedTile = null;
      }
    });

    // Swipe support
    this.input.on('dragstart', this.onDragStart, this);
    this.input.on('drag', this.onDrag, this);
    this.input.on('dragend', this.onDragEnd, this);
  }

  private async trySwap(tile1: Tile, tile2: Tile) {
    this.isProcessing = true;

    // Animate swap
    await this.animateSwap(tile1, tile2);

    // Check for matches
    const matches = this.findMatches();

    if (matches.length === 0) {
      // No match - swap back
      await this.animateSwap(tile1, tile2);
      this.isProcessing = false;
      return;
    }

    // Valid move - consume a move
    this.movesRemaining--;
    this.events.emit('movesUpdate', this.movesRemaining);

    // Process matches and cascades
    await this.processMatches(matches);

    // Check win/lose conditions
    this.checkGameState();

    this.isProcessing = false;
  }

  private findMatches(): Match[] {
    const matches: Match[] = [];
    const { width, height } = this.config.grid;

    // Find horizontal matches
    for (let row = 0; row < height; row++) {
      let matchStart = 0;
      for (let col = 1; col <= width; col++) {
        const current = this.grid[row][col];
        const prev = this.grid[row][col - 1];

        if (col < width && current && prev && current.type === prev.type) {
          continue;
        }

        const matchLength = col - matchStart;
        if (matchLength >= 3) {
          const tiles = [];
          for (let c = matchStart; c < col; c++) {
            if (this.grid[row][c]) tiles.push(this.grid[row][c]!);
          }
          matches.push({ tiles, type: 'horizontal', length: matchLength });
        }
        matchStart = col;
      }
    }

    // Find vertical matches (similar logic)
    // ...

    return this.mergeOverlappingMatches(matches);
  }

  private async processMatches(matches: Match[]) {
    // Remove matched tiles with animation
    for (const match of matches) {
      await this.removeMatchedTiles(match);
      this.updateScore(match);
      this.updateObjectives(match);

      // Create special tiles for 4+ matches
      if (match.length >= 4) {
        this.createSpecialTile(match);
      }
    }

    // Drop tiles and fill empty spaces
    await this.dropTiles();
    await this.fillEmptySpaces();

    // Check for cascade matches
    const cascadeMatches = this.findMatches();
    if (cascadeMatches.length > 0) {
      await this.processMatches(cascadeMatches);
    }
  }

  private checkGameState() {
    // Check if objectives are complete
    const allObjectivesComplete = Array.from(this.objectives.values())
      .every(obj => obj.current >= obj.target);

    if (allObjectivesComplete) {
      const stars = this.calculateStars();
      this.events.emit('levelComplete', {
        score: this.score,
        stars,
        movesRemaining: this.movesRemaining,
      });
      return;
    }

    // Check if out of moves
    if (this.movesRemaining <= 0) {
      this.events.emit('levelFail', 'out-of-moves');
      return;
    }

    // Check if no possible moves
    if (!this.hasPossibleMoves()) {
      this.shuffleBoard();
    }
  }

  // ... Additional methods for animations, special tiles, etc.
}
```

## AI Theme Generator

```typescript
// src/ai/generators/ThemeGenerator.ts

import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { ThemeSchema } from '../schemas/ThemeSchema';

const THEME_SYSTEM_PROMPT = `You are an expert UI/UX designer specializing in mobile puzzle games.

Your task is to generate color themes that are:
1. Visually cohesive and harmonious
2. Accessible (WCAG AA contrast ratios)
3. Emotionally resonant with the described mood
4. Optimized for mobile screens

Always return valid JSON matching the exact schema provided.
Never include explanations - only the JSON object.`;

export class ThemeGenerator {
  private client: Anthropic;
  private cache: Map<string, ThemeConfig>;

  constructor() {
    this.client = new Anthropic();
    this.cache = new Map();
  }

  async generateTheme(prompt: string): Promise<ThemeConfig> {
    // Check cache first
    const cacheKey = this.getCacheKey(prompt);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: THEME_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate a theme for a puzzle game with this description:

"${prompt}"

Return a JSON object with this exact structure:
{
  "name": "Theme Name",
  "mood": "emotional tone description",
  "colors": {
    "primary": "#HEXCOLOR",
    "secondary": "#HEXCOLOR",
    "accent": "#HEXCOLOR",
    "background": "#HEXCOLOR",
    "surface": "#HEXCOLOR",
    "text": {
      "primary": "#HEXCOLOR",
      "secondary": "#HEXCOLOR",
      "muted": "#HEXCOLOR"
    }
  },
  "typography": {
    "fontFamily": "font name",
    "headingWeight": "bold"
  },
  "borders": {
    "radius": "md",
    "width": "thin"
  }
}

Return ONLY the JSON object, no other text.`,
        },
      ],
    });

    // Extract JSON from response
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse and validate
    const parsed = JSON.parse(content.text);
    const validated = ThemeSchema.parse(parsed);

    // Cache result
    this.cache.set(cacheKey, validated);

    return validated;
  }

  async refineTheme(
    currentTheme: ThemeConfig,
    refinement: string
  ): Promise<ThemeConfig> {
    const response = await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022', // Faster for refinements
      max_tokens: 512,
      system: THEME_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Current theme:
${JSON.stringify(currentTheme, null, 2)}

Refinement request: "${refinement}"

Return the updated theme JSON with only the necessary changes applied.
Preserve unchanged values. Return ONLY the JSON object.`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const parsed = JSON.parse(content.text);
    return ThemeSchema.parse(parsed);
  }

  private getCacheKey(prompt: string): string {
    // Normalize prompt for cache matching
    return prompt.toLowerCase().trim().replace(/\s+/g, ' ');
  }
}
```

## Level Generator

```typescript
// src/ai/generators/LevelGenerator.ts

import Anthropic from '@anthropic-ai/sdk';
import { Match3LevelSchema } from '../schemas/LevelSchema';

const LEVEL_SYSTEM_PROMPT = `You are an expert puzzle game level designer.

Design levels that are:
1. Fair but challenging
2. Follow a smooth difficulty curve
3. Introduce new mechanics gradually
4. Balanced for casual mobile players

Level difficulty guidelines:
- Easy: 25-30 moves, simple objectives, 3-4 tile types
- Medium: 20-25 moves, compound objectives, 4-5 tile types
- Hard: 15-20 moves, multiple objectives, 5-6 tile types
- Expert: 12-18 moves, complex objectives, obstacles

Always return valid JSON arrays matching the schema.`;

export class LevelGenerator {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic();
  }

  async generateLevels(
    gameTheme: string,
    count: number,
    startDifficulty: 'easy' | 'medium' | 'hard' = 'easy'
  ): Promise<LevelConfig[]> {
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: LEVEL_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate ${count} match-3 puzzle levels for a "${gameTheme}" themed game.

Start at ${startDifficulty} difficulty and gradually increase.

For each level, provide:
{
  "levelNumber": 1,
  "name": "Creative level name matching theme",
  "grid": {
    "width": 8,
    "height": 8,
    "blockedCells": [[row, col], ...]  // 0-3 blocked cells for easy, more for harder
  },
  "objectives": [
    { "type": "collect", "target": "tileType", "count": 10 },
    { "type": "score", "target": 5000, "count": 1 }
  ],
  "moves": 25,
  "starThresholds": [3000, 5000, 8000],
  "availableTiles": ["tile1", "tile2", "tile3", "tile4"],
  "specialTileChance": 0.1,
  "difficulty": "easy"
}

Return a JSON array of ${count} level objects. No other text.`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const parsed = JSON.parse(content.text);
    return parsed.map((level: unknown) => Match3LevelSchema.parse(level));
  }

  async adjustLevelDifficulty(
    level: LevelConfig,
    adjustment: 'easier' | 'harder'
  ): Promise<LevelConfig> {
    const response = await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Current level:
${JSON.stringify(level, null, 2)}

Make this level ${adjustment} by adjusting moves, objectives, or grid complexity.
Return the modified level JSON only.`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    return Match3LevelSchema.parse(JSON.parse(content.text));
  }
}
```

## API Routes

```typescript
// src/app/api/ai/generate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ThemeGenerator } from '@/ai/generators/ThemeGenerator';
import { LevelGenerator } from '@/ai/generators/LevelGenerator';
import { ContentGenerator } from '@/ai/generators/ContentGenerator';
import { rateLimit } from '@/lib/rateLimit';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  // Authenticate
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit
  const rateLimitResult = await rateLimit(userId, 'ai-generate');
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retryAfter: rateLimitResult.retryAfter },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { type, prompt, options } = body;

  try {
    let result;

    switch (type) {
      case 'full-game':
        result = await generateFullGame(prompt, options);
        break;
      case 'theme':
        result = await new ThemeGenerator().generateTheme(prompt);
        break;
      case 'levels':
        result = await new LevelGenerator().generateLevels(
          prompt,
          options?.count || 10,
          options?.startDifficulty
        );
        break;
      case 'content':
        result = await new ContentGenerator().generateContent(prompt, options);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    // Track usage
    await db.aiUsage.create({
      data: {
        userId,
        type,
        tokensUsed: result.tokensUsed || 0,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Generation failed', details: error.message },
      { status: 500 }
    );
  }
}

async function generateFullGame(prompt: string, options: any) {
  const [theme, levels, content] = await Promise.all([
    new ThemeGenerator().generateTheme(prompt),
    new LevelGenerator().generateLevels(prompt, options?.levelCount || 50),
    new ContentGenerator().generateContent(prompt, {
      type: 'full',
      gameType: options?.gameType || 'match3',
    }),
  ]);

  return {
    theme,
    levels,
    content,
    config: {
      gameType: options?.gameType || 'match3',
      name: content.gameName,
      description: content.description,
    },
  };
}
```

## Multi-Tenant Game Resolver

```typescript
// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getGameBySlug } from '@/lib/games';

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';

  // Check if this is a game subdomain
  // Format: {slug}.puzzleforge.games
  const gameMatch = hostname.match(/^([a-z0-9-]+)\.puzzleforge\.games$/);

  if (gameMatch) {
    const slug = gameMatch[1];

    // Skip platform subdomains
    if (['www', 'api', 'app', 'dashboard'].includes(slug)) {
      return NextResponse.next();
    }

    // Look up game
    const game = await getGameBySlug(slug);

    if (!game) {
      // Game not found - show 404
      return NextResponse.rewrite(new URL('/game-not-found', req.url));
    }

    if (game.status !== 'published') {
      // Game not published
      return NextResponse.rewrite(new URL('/game-not-available', req.url));
    }

    // Rewrite to game player with game ID
    const url = new URL(`/play/${game.id}`, req.url);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
  ],
};
```

---

# 12. Risk Assessment & Mitigation

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         RISK ASSESSMENT                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  TECHNICAL RISKS                                                        │
│  ═══════════════                                                        │
│                                                                         │
│  Risk: AI generation quality inconsistent                               │
│  Impact: High | Probability: Medium                                     │
│  Mitigation:                                                            │
│  • Strict output schemas with validation                                │
│  • Human review for edge cases                                          │
│  • Pre-generated templates as fallbacks                                 │
│  • Multiple AI providers for redundancy                                 │
│                                                                         │
│  Risk: Phaser performance issues on low-end devices                     │
│  Impact: Medium | Probability: Medium                                   │
│  Mitigation:                                                            │
│  • Progressive enhancement                                              │
│  • Performance profiling and optimization                               │
│  • Fallback to simpler graphics                                         │
│  • Device capability detection                                          │
│                                                                         │
│  Risk: AI API costs exceed projections                                  │
│  Impact: Medium | Probability: Medium                                   │
│  Mitigation:                                                            │
│  • Aggressive caching strategy                                          │
│  • Model tiering (Haiku vs Sonnet)                                      │
│  • Usage limits per tier                                                │
│  • Pre-generation of common patterns                                    │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  MARKET RISKS                                                           │
│  ════════════                                                           │
│                                                                         │
│  Risk: Low creator adoption                                             │
│  Impact: High | Probability: Medium                                     │
│  Mitigation:                                                            │
│  • Focus on influencer partnerships                                     │
│  • Free tier with generous limits                                       │
│  • Showcase success stories                                             │
│  • Referral program                                                     │
│                                                                         │
│  Risk: Competition from established players                             │
│  Impact: Medium | Probability: High                                     │
│  Mitigation:                                                            │
│  • Move fast, establish first-mover advantage                           │
│  • Focus on AI differentiation                                          │
│  • Build community and network effects                                  │
│  • Patents on key innovations                                           │
│                                                                         │
│  Risk: Player quality expectations not met                              │
│  Impact: High | Probability: Medium                                     │
│  Mitigation:                                                            │
│  • Invest in Phaser engine quality                                      │
│  • Curated game discovery                                               │
│  • Quality thresholds for featuring                                     │
│  • Player feedback loops                                                │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  OPERATIONAL RISKS                                                      │
│  ═════════════════                                                      │
│                                                                         │
│  Risk: Scaling infrastructure                                           │
│  Impact: Medium | Probability: Low                                      │
│  Mitigation:                                                            │
│  • Serverless architecture (Vercel)                                     │
│  • Edge caching (Cloudflare)                                            │
│  • Database scaling plan (Supabase)                                     │
│  • Load testing before launches                                         │
│                                                                         │
│  Risk: Content moderation at scale                                      │
│  Impact: Medium | Probability: Medium                                   │
│  Mitigation:                                                            │
│  • AI content filtering                                                 │
│  • Creator terms of service                                             │
│  • Report/flag system                                                   │
│  • Human moderation team (when scaled)                                  │
│                                                                         │
│  Risk: Payment/payout issues                                            │
│  Impact: High | Probability: Low                                        │
│  Mitigation:                                                            │
│  • Use established payment rails (Stripe)                               │
│  • Clear creator agreements                                             │
│  • Reserve fund for disputes                                            │
│  • Legal review of terms                                                │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  REGULATORY RISKS                                                       │
│  ════════════════                                                       │
│                                                                         │
│  Risk: COPPA compliance for children's games                            │
│  Impact: High | Probability: Medium                                     │
│  Mitigation:                                                            │
│  • Age gates where required                                             │
│  • Parental consent flows                                               │
│  • Limited data collection                                              │
│  • Legal compliance review                                              │
│                                                                         │
│  Risk: Gambling regulations for in-game currency                        │
│  Impact: High | Probability: Low                                        │
│  Mitigation:                                                            │
│  • No real-money cashout (initially)                                    │
│  • Clear "no monetary value" terms                                      │
│  • Avoid loot box mechanics                                             │
│  • Legal review per jurisdiction                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 13. Team Requirements

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         TEAM STRUCTURE                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  MVP TEAM (Months 1-6)                                                  │
│  ═════════════════════                                                  │
│                                                                         │
│  Core Team: 4-5 people                                                  │
│                                                                         │
│  1. Founder/CEO                                                         │
│     • Product vision and strategy                                       │
│     • Fundraising and partnerships                                      │
│     • Early customer development                                        │
│                                                                         │
│  2. Technical Lead / Full-Stack Engineer                                │
│     • Architecture decisions                                            │
│     • Next.js / React development                                       │
│     • AI integration                                                    │
│     • DevOps                                                            │
│                                                                         │
│  3. Game Engineer (Phaser.js specialist)                                │
│     • Match-3 engine development                                        │
│     • Game mechanics and physics                                        │
│     • Performance optimization                                          │
│     • Level design tools                                                │
│                                                                         │
│  4. Product Designer                                                    │
│     • Creator dashboard UX                                              │
│     • Game UI templates                                                 │
│     • Brand and marketing design                                        │
│     • User research                                                     │
│                                                                         │
│  5. AI/ML Engineer (Part-time or Contractor)                            │
│     • Prompt engineering                                                │
│     • AI pipeline optimization                                          │
│     • Content generation quality                                        │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  SCALE TEAM (Months 7-12)                                               │
│  ════════════════════════                                               │
│                                                                         │
│  Additional hires: +4-6 people                                          │
│                                                                         │
│  • Frontend Engineer (Creator tools)                                    │
│  • Backend Engineer (Platform scaling)                                  │
│  • Game Designer (Level design, balancing)                              │
│  • Growth/Marketing Lead                                                │
│  • Community Manager                                                    │
│  • Customer Success                                                     │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  ADVISORS (Recommended)                                                 │
│  ══════════════════════                                                 │
│                                                                         │
│  • Mobile gaming industry veteran                                       │
│  • AI/ML expert                                                         │
│  • Creator economy expert                                               │
│  • Legal (gaming regulations)                                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 14. Investment Ask

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         INVESTMENT SUMMARY                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  FUNDING ROUND: Pre-Seed                                                │
│  ═══════════════════════                                                │
│                                                                         │
│  Amount Seeking:           $500,000 - $750,000                          │
│  Valuation (Pre-money):    $3M - $4M                                    │
│  Use of Funds:             18 months runway                             │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  USE OF FUNDS                                                           │
│  ════════════                                                           │
│                                                                         │
│  Engineering (60%)                          $300,000 - $450,000         │
│  • Core team salaries                                                   │
│  • Contractor/freelance support                                         │
│  • Infrastructure costs                                                 │
│  • AI API costs                                                         │
│                                                                         │
│  Product & Design (15%)                     $75,000 - $112,500          │
│  • Design tools and resources                                           │
│  • User research                                                        │
│  • Asset creation                                                       │
│                                                                         │
│  Marketing & Growth (15%)                   $75,000 - $112,500          │
│  • Creator acquisition                                                  │
│  • Content marketing                                                    │
│  • Influencer partnerships                                              │
│  • Community building                                                   │
│                                                                         │
│  Operations & Legal (10%)                   $50,000 - $75,000           │
│  • Legal setup and compliance                                           │
│  • Accounting and admin                                                 │
│  • Office/tools                                                         │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  MILESTONES FOR NEXT ROUND (Series A)                                   │
│  ════════════════════════════════════                                   │
│                                                                         │
│  • 1,000+ active creators                                               │
│  • 100+ published games                                                 │
│  • $50K+ MRR                                                            │
│  • 500K+ total players                                                  │
│  • 2 game types (Match-3 + Word)                                        │
│  • Product-market fit signals                                           │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  WHY INVEST NOW                                                         │
│  ══════════════                                                         │
│                                                                         │
│  1. TIMING: AI capabilities just reached threshold for game generation  │
│  2. MARKET: $13B puzzle market, no AI-native solution                   │
│  3. FOUNDATION: UI kit already built, 70% of shell complete             │
│  4. TEAM: [Your team's relevant experience]                             │
│  5. VISION: Clear path from MVP to platform to ecosystem                │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  COMPARABLE EXITS                                                       │
│  ════════════════                                                       │
│                                                                         │
│  • Roblox: $45B market cap (game creation platform)                     │
│  • Buildbox: Acquired by AppLovin                                       │
│  • Peak Games: Acquired by Zynga for $1.8B                              │
│  • Socialpoint: Acquired by Take-Two for $250M                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# Appendix A: Glossary

| Term | Definition |
|------|------------|
| **Creator** | User who creates games on PuzzleForge |
| **Player** | End user who plays games |
| **Phaser.js** | HTML5 game framework used for core gameplay |
| **PWA** | Progressive Web App - installable web games |
| **LiveOps** | Live operations - events and content updates |
| **IAP** | In-app purchase |
| **ARPDAU** | Average revenue per daily active user |
| **DAU** | Daily active users |
| **LTV** | Lifetime value of a customer |
| **CAC** | Customer acquisition cost |

---

# Appendix B: Technical Specifications Summary

| Component | Technology | Status |
|-----------|------------|--------|
| UI Framework | React 19 + Next.js 16 | ✅ Complete |
| Styling | Tailwind CSS 4 | ✅ Complete |
| Game Engine | Phaser.js 3.80 | 🔨 To Build |
| AI Primary | Claude API (Anthropic) | 🔨 To Build |
| AI Secondary | OpenAI GPT-4 + DALL-E | 🔨 To Build |
| Database | PostgreSQL (Supabase) | 🔨 To Build |
| Cache | Redis (Upstash) | 🔨 To Build |
| Auth | Clerk | 🔨 To Build |
| Payments | Stripe | 🔨 To Build |
| Ads | AdMob / IronSource | 🔨 To Build |
| Hosting | Vercel | ✅ Ready |
| CDN | Cloudflare | ✅ Ready |

---

*Document Version 1.0 - December 2024*
*Confidential - For Investor Review Only*
