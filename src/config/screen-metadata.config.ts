/**
 * Screen Metadata Configuration
 *
 * Detailed metadata for all screens in the game flow.
 * Used by the Screen Info Panel to display documentation.
 */

import type { ScreenMetadata, ScreenMetadataRegistry } from '@/types/screen-metadata';

// =============================================================================
// PRIORITY 1: CORE GAMEPLAY SCREENS
// =============================================================================

const mainMenu: ScreenMetadata = {
  id: 'main-menu',
  name: 'Main Menu',
  category: 'main',
  description: 'Central hub for all game features. Shows current level, resources, and active events.',
  logic: [
    'Displays current area decoration progress',
    'Shows player level and available lives',
    'Lists active LiveOps events with timers',
    'Provides access to all game features via navigation',
  ],
  conditions: [
    'Default landing screen after app launch',
    'Returned to after completing/failing a level',
  ],
  inputs: [
    { name: 'playerLevel', type: 'number', description: 'Current player level', required: true },
    { name: 'lives', type: 'number', description: 'Current life count', required: true },
    { name: 'coins', type: 'number', description: 'Current coin balance', required: true },
    { name: 'activeEvents', type: 'Event[]', description: 'List of active LiveOps events' },
  ],
  outputs: [
    { action: 'Tap Play', effect: 'Navigate to level-start modal' },
    { action: 'Tap Event Banner', effect: 'Navigate to respective event page' },
    { action: 'Tap Shop', effect: 'Navigate to shop page' },
    { action: 'Tap Settings', effect: 'Navigate to settings page' },
  ],
  metrics: [
    'Session start rate from main menu',
    'Feature tap-through rates',
    'Event banner engagement',
    'Time spent on main menu',
  ],
  edgeCases: [
    'No active events: Hide event section',
    'Lives depleted: Show "Out of Lives" prompt on Play tap',
    'App backgrounded: Pause any timers',
  ],
  relatedScreens: ['level-start', 'shop', 'settings', 'team', 'royal-pass'],
};

const gameplay: ScreenMetadata = {
  id: 'gameplay',
  name: 'Gameplay',
  category: 'main',
  description: 'Core match-3 puzzle gameplay screen where player attempts to complete level objectives.',
  logic: [
    'Renders game board with tiles and obstacles',
    'Tracks moves remaining and goal progress',
    'Applies pre-game boosters from streak or selection',
    'Handles match logic and special tile creation',
  ],
  conditions: [
    'Player taps "Play" from level-start modal',
    'Player has >= 1 life',
  ],
  inputs: [
    { name: 'levelId', type: 'number', description: 'Level to load', required: true },
    { name: 'selectedBoosters', type: 'Booster[]', description: 'Pre-game boosters selected' },
    { name: 'streakBoosters', type: 'Booster[]', description: 'Boosters from Harmonic Blessing' },
  ],
  outputs: [
    { action: 'Complete Goal', effect: 'Show level-complete modal, progress events' },
    { action: 'Run Out of Moves', effect: 'Show level-failed modal' },
    { action: 'Tap Pause', effect: 'Show pause menu with quit option' },
    { action: 'Quit Level', effect: 'lives -= 1, reset streak, return to main-menu' },
  ],
  metrics: [
    'Level completion rate',
    'Moves remaining on completion',
    'Booster usage rate',
    'Session length per level',
    'Quit rate before failure',
  ],
  edgeCases: [
    'App force close: Treat as quit, deduct life',
    'Network disconnect: Allow offline play, sync on reconnect',
    'Device rotation: Lock to portrait',
  ],
  relatedScreens: ['level-start', 'level-complete', 'level-failed', 'booster-select'],
};

const levelStart: ScreenMetadata = {
  id: 'level-start',
  name: 'Level Start',
  category: 'modal',
  description: 'Pre-level modal showing objectives, difficulty, and booster selection.',
  logic: [
    'Displays level number and objectives',
    'Shows difficulty indicator (stars)',
    'Lists available pre-game boosters',
    'Shows Harmonic Blessing boosters if active',
  ],
  conditions: [
    'Player taps "Play" on main menu',
    'Player has >= 1 life',
  ],
  inputs: [
    { name: 'levelId', type: 'number', description: 'Level to preview', required: true },
    { name: 'objectives', type: 'Objective[]', description: 'Level goals to complete' },
    { name: 'streakTier', type: 'number', description: 'Current Harmonic Blessing tier' },
  ],
  outputs: [
    { action: 'Tap Play', effect: 'Start gameplay with selected boosters' },
    { action: 'Tap Booster', effect: 'Open booster-select modal' },
    { action: 'Close Modal', effect: 'Return to main-menu' },
  ],
  metrics: [
    'Play button conversion rate',
    'Booster selection rate',
    'Modal dismiss rate',
  ],
  edgeCases: [
    'No boosters available: Show "Get Boosters" button',
    'Streak boosters active: Pre-populate and lock them',
  ],
  relatedScreens: ['main-menu', 'gameplay', 'booster-select'],
};

const levelComplete: ScreenMetadata = {
  id: 'level-complete',
  name: 'Level Complete',
  category: 'modal',
  description: 'Victory modal shown after completing level objectives. Awards stars and progresses events.',
  logic: [
    'Displays completion celebration animation',
    'Shows stars earned (1-3 based on moves remaining)',
    'Awards event progress (Royal Pass, Team Chest, etc.)',
    'Advances Harmonic Blessing tier if active',
  ],
  conditions: [
    'Player completes all level objectives',
    'Moves remaining >= 0',
  ],
  inputs: [
    { name: 'levelId', type: 'number', description: 'Completed level', required: true },
    { name: 'movesRemaining', type: 'number', description: 'Moves left on completion' },
    { name: 'starsEarned', type: 'number', description: 'Stars awarded (1-3)' },
  ],
  outputs: [
    { action: 'Tap Continue', effect: 'Return to main-menu, apply rewards' },
    { action: 'Tap Next Level', effect: 'Open level-start for next level' },
  ],
  metrics: [
    'Average stars per level',
    'Next level tap rate',
    'Celebration view duration',
  ],
  edgeCases: [
    'Max level reached: Hide "Next Level" button',
    'Event completed: Show special celebration',
  ],
  relatedScreens: ['gameplay', 'main-menu', 'level-start'],
};

const levelFailed: ScreenMetadata = {
  id: 'level-failed',
  name: 'Level Failed',
  category: 'modal',
  description: 'Shown when player runs out of moves without completing the goal.',
  logic: [
    'Displays when moves reach 0 and goal is incomplete',
    'Offers "Continue" option (costs coins for extra moves)',
    '"Give Up" returns to main menu and deducts 1 life',
    'If no lives remaining, redirects to Out of Lives modal',
  ],
  conditions: [
    'Moves == 0 AND Goal not completed',
    'Player has >= 1 life remaining',
  ],
  inputs: [
    { name: 'levelId', type: 'number', description: 'Current level number', required: true },
    { name: 'progress', type: 'object', description: 'Collection progress {collected, goal}' },
    { name: 'playerCoins', type: 'number', description: 'Current coin balance' },
  ],
  outputs: [
    { action: 'Continue', effect: 'coins -= continueCost, extraMoves += 5', condition: 'coins >= continueCost' },
    { action: 'Give Up', effect: 'lives -= 1, streak = 0, navigate("main-menu")' },
  ],
  metrics: [
    'Continue button conversion rate',
    'Avg coins spent on continues per level',
    'Give up rate by level difficulty',
    'Time spent on modal before decision',
  ],
  edgeCases: [
    'App close while modal open: Treat as "Give Up"',
    'No coins: Disable continue button, show "Get Coins"',
    'No lives after give up: Show "Out of Lives" modal',
  ],
  relatedScreens: ['gameplay', 'out-of-lives', 'main-menu', 'shop'],
};

const outOfLives: ScreenMetadata = {
  id: 'out-of-lives',
  name: 'Out of Lives',
  category: 'modal',
  description: 'Shown when player has 0 lives and attempts to play. Offers recovery options.',
  logic: [
    'Displays when lives == 0 and player tries to play',
    'Shows time until next free life',
    'Offers watch ad for free life (if ads available)',
    'Offers purchase lives with coins or IAP',
  ],
  conditions: [
    'Player lives == 0',
    'Player attempts to start a level',
  ],
  inputs: [
    { name: 'nextLifeTime', type: 'number', description: 'Seconds until next free life' },
    { name: 'adsRemaining', type: 'number', description: 'Daily ad watches remaining' },
    { name: 'playerCoins', type: 'number', description: 'Current coin balance' },
  ],
  outputs: [
    { action: 'Watch Ad', effect: 'lives += 1, dailyAdsWatched += 1', condition: 'adsRemaining > 0' },
    { action: 'Buy Lives (Coins)', effect: 'coins -= cost, lives = maxLives', condition: 'coins >= cost' },
    { action: 'Buy Lives (IAP)', effect: 'Open purchase flow' },
    { action: 'Ask Friend', effect: 'Open friend request modal' },
    { action: 'Wait', effect: 'Close modal, return to main-menu' },
  ],
  metrics: [
    'Ad watch rate',
    'Coin purchase conversion',
    'IAP conversion rate',
    'Wait (churn risk) rate',
  ],
  edgeCases: [
    'No ads available: Hide ad button',
    'No friends: Hide ask friend option',
    'IAP disabled: Hide purchase option',
  ],
  relatedScreens: ['main-menu', 'shop', 'free-lives', 'friends'],
};

const boosterSelect: ScreenMetadata = {
  id: 'booster-select',
  name: 'Booster Select',
  category: 'modal',
  description: 'Pre-game modal for selecting boosters to use at level start.',
  logic: [
    'Shows available pre-game boosters with quantities',
    'Allows selecting up to 3 boosters',
    'Deducts selected boosters from inventory on play',
  ],
  conditions: [
    'Player taps booster slot in level-start modal',
  ],
  inputs: [
    { name: 'boosters', type: 'Record<string, number>', description: 'Player booster inventory' },
    { name: 'streakBoosters', type: 'Booster[]', description: 'Pre-selected from streak (locked)' },
  ],
  outputs: [
    { action: 'Select Booster', effect: 'Add to selection (max 3)' },
    { action: 'Confirm', effect: 'Return selection to level-start' },
    { action: 'Cancel', effect: 'Discard selection, close modal' },
  ],
  metrics: [
    'Booster selection rate per type',
    'Avg boosters selected per level',
  ],
  edgeCases: [
    'No boosters: Show "Get Boosters" CTA',
    'Streak boosters: Pre-selected and cannot be removed',
  ],
  relatedScreens: ['level-start', 'shop'],
};

const rewardClaim: ScreenMetadata = {
  id: 'reward-claim',
  name: 'Reward Claim',
  category: 'modal',
  description: 'Modal for claiming rewards from events, achievements, or daily bonuses.',
  logic: [
    'Displays rewards with celebration animation',
    'Adds rewards to player inventory',
    'Marks reward source as claimed',
  ],
  conditions: [
    'Player completes event milestone',
    'Player claims daily reward',
    'Achievement unlocked',
  ],
  inputs: [
    { name: 'rewards', type: 'Reward[]', description: 'Items to award' },
    { name: 'source', type: 'string', description: 'Where reward came from' },
  ],
  outputs: [
    { action: 'Claim', effect: 'Add rewards to inventory, close modal' },
  ],
  metrics: [
    'Claim rate by source',
    'Time to claim after unlock',
  ],
  edgeCases: [
    'Inventory full: Stack or show warning',
    'Multiple rewards pending: Queue modals',
  ],
  relatedScreens: ['main-menu', 'royal-pass', 'daily-bonus'],
};

// =============================================================================
// PRIORITY 2: WINNING STREAK MODULES
// =============================================================================

const winningStreak: ScreenMetadata = {
  id: 'winning-streak',
  name: 'Harmonic Blessing',
  category: 'liveops',
  description: 'Progressive booster rewards for consecutive level wins. Boosters accumulate up to max tier and reset on failure.',
  unlockLevel: 30,
  logic: [
    'Shows current streak tier and accumulated boosters',
    'Each consecutive win advances tier (up to max)',
    'Boosters auto-apply at level start',
    'Complete reset to Tier 0 on level failure or quit',
  ],
  conditions: [
    'Player level >= 30',
    'Feature enabled in admin settings',
  ],
  inputs: [
    { name: 'currentTier', type: 'number', description: 'Current streak tier (0-3)' },
    { name: 'streakCount', type: 'number', description: 'Consecutive wins count' },
    { name: 'activeBoosters', type: 'Booster[]', description: 'Boosters earned at current tier' },
  ],
  outputs: [
    { action: 'Play Level', effect: 'Apply streak boosters to next level' },
    { action: 'View Info', effect: 'Open Harmonic Blessing info modal' },
  ],
  metrics: [
    'Avg streak length before reset',
    'Tier distribution of active players',
    'Booster usage rate from streak rewards',
    'Retention impact of streak feature',
  ],
  edgeCases: [
    'Player quits level: Reset streak',
    'Player continues after fail: Still resets streak',
    'Max tier reached: Stay at max, no additional progression',
  ],
  relatedScreens: ['main-menu', 'level-start', 'gameplay'],
};

const clefCollection: ScreenMetadata = {
  id: 'clef-collection',
  name: 'Clef Collection',
  category: 'liveops',
  description: 'Collectible milestone system where players collect music clefs to unlock special rewards at milestones.',
  unlockLevel: 25,
  logic: [
    'Clefs drop randomly during gameplay',
    'Progress bar shows clefs toward next milestone',
    'Milestones unlock coins, boosters, and decorations',
    'Event runs for limited time with reset',
  ],
  conditions: [
    'Player level >= 25',
    'Event is active (time-limited)',
  ],
  inputs: [
    { name: 'clefsCollected', type: 'number', description: 'Total clefs this event' },
    { name: 'currentMilestone', type: 'number', description: 'Current milestone index' },
    { name: 'milestones', type: 'Milestone[]', description: 'List of milestone rewards' },
  ],
  outputs: [
    { action: 'Claim Milestone', effect: 'Add milestone reward to inventory' },
    { action: 'View Details', effect: 'Show full milestone list' },
  ],
  metrics: [
    'Clefs collected per session',
    'Milestone completion rate',
    'Event engagement rate',
  ],
  edgeCases: [
    'Event ends mid-progress: Award partial progress bonus',
    'All milestones claimed: Show completion celebration',
  ],
  relatedScreens: ['main-menu', 'gameplay', 'reward-claim'],
};

// =============================================================================
// PRIORITY 3: MONETIZATION SCREENS
// =============================================================================

const shop: ScreenMetadata = {
  id: 'shop',
  name: 'Shop',
  category: 'monetization',
  description: 'In-game store for purchasing coins, lives, boosters, and special offers.',
  logic: [
    'Displays categorized items (coins, lives, boosters, bundles)',
    'Shows current balances and prices',
    'Handles IAP flow for real money purchases',
    'Coin purchases deduct from balance',
  ],
  conditions: [
    'Always accessible from main menu',
    'May show contextual offers based on player state',
  ],
  inputs: [
    { name: 'playerCoins', type: 'number', description: 'Current coin balance' },
    { name: 'iapProducts', type: 'Product[]', description: 'Available IAP items' },
    { name: 'specialOffers', type: 'Offer[]', description: 'Time-limited offers' },
  ],
  outputs: [
    { action: 'Buy with Coins', effect: 'coins -= price, add item to inventory' },
    { action: 'Buy with IAP', effect: 'Open platform purchase flow' },
    { action: 'View Offer', effect: 'Open offer detail modal' },
  ],
  metrics: [
    'Shop visit rate',
    'Conversion rate by item type',
    'ARPU from shop purchases',
    'Offer acceptance rate',
  ],
  edgeCases: [
    'IAP disabled: Hide real money items',
    'Purchase fails: Show error, refund if charged',
    'Offer expired: Remove from display',
  ],
  relatedScreens: ['main-menu', 'out-of-lives', 'booster-select'],
};

const freeLives: ScreenMetadata = {
  id: 'free-lives',
  name: 'Free Lives',
  category: 'modal',
  description: 'Modal offering free lives through ads, friends, or daily rewards.',
  logic: [
    'Shows ad-for-life option (limited daily)',
    'Shows friend request option',
    'Shows time until next free life regeneration',
  ],
  conditions: [
    'Accessed from out-of-lives modal',
    'Or from main menu life indicator',
  ],
  inputs: [
    { name: 'adsRemaining', type: 'number', description: 'Daily ad watches remaining' },
    { name: 'friendsToAsk', type: 'Friend[]', description: 'Friends who can send lives' },
    { name: 'nextLifeTime', type: 'number', description: 'Seconds until free life' },
  ],
  outputs: [
    { action: 'Watch Ad', effect: 'lives += 1, adsWatched += 1' },
    { action: 'Ask Friends', effect: 'Send life request to selected friends' },
    { action: 'Close', effect: 'Return to previous screen' },
  ],
  metrics: [
    'Ad watch completion rate',
    'Friend request send rate',
    'Lives received from friends',
  ],
  edgeCases: [
    'No ads available: Hide ad option',
    'No friends: Show invite prompt',
  ],
  relatedScreens: ['out-of-lives', 'friends'],
};

// =============================================================================
// PRIORITY 4: SOCIAL & EVENTS
// =============================================================================

const team: ScreenMetadata = {
  id: 'team',
  name: 'Team',
  category: 'social',
  description: 'Team management screen showing members, chat, and team chest progress.',
  unlockLevel: 20,
  logic: [
    'Displays team members and their contributions',
    'Shows team chest progress',
    'Provides team chat functionality',
    'Leaders/elders can manage team settings',
  ],
  conditions: [
    'Player is in a team',
    'Player level >= 20',
  ],
  inputs: [
    { name: 'teamId', type: 'string', description: 'Current team ID' },
    { name: 'members', type: 'Member[]', description: 'Team member list' },
    { name: 'chestProgress', type: 'number', description: 'Team chest contribution' },
  ],
  outputs: [
    { action: 'View Member', effect: 'Open member profile' },
    { action: 'Send Chat', effect: 'Post message to team chat' },
    { action: 'Leave Team', effect: 'Remove player from team' },
  ],
  metrics: [
    'Chat activity rate',
    'Team chest participation',
    'Member retention rate',
  ],
  edgeCases: [
    'Not in team: Show team finder',
    'Team full: Hide join button',
    'Leader leaves: Auto-promote elder',
  ],
  relatedScreens: ['main-menu', 'team-chest', 'friends'],
};

const teamChest: ScreenMetadata = {
  id: 'team-chest',
  name: 'Team Chest',
  category: 'liveops',
  description: 'Team-based event where members contribute to unlock shared rewards.',
  unlockLevel: 20,
  logic: [
    'Shows team progress toward chest goal',
    'Displays individual contributions',
    'Unlocks tiered rewards as progress increases',
    'All team members receive rewards',
  ],
  conditions: [
    'Player is in a team',
    'Team Chest event is active',
  ],
  inputs: [
    { name: 'teamProgress', type: 'number', description: 'Total team contribution' },
    { name: 'playerContribution', type: 'number', description: 'This player contribution' },
    { name: 'tiers', type: 'Tier[]', description: 'Reward tiers' },
  ],
  outputs: [
    { action: 'Claim Tier', effect: 'Add tier reward to inventory' },
    { action: 'View Leaderboard', effect: 'Show team contribution rankings' },
  ],
  metrics: [
    'Avg contribution per member',
    'Tier completion rate',
    'Team engagement lift',
  ],
  edgeCases: [
    'Player joins mid-event: Pro-rate contribution',
    'Team disbands: Award current progress',
  ],
  relatedScreens: ['team', 'main-menu', 'reward-claim'],
};

const friends: ScreenMetadata = {
  id: 'friends',
  name: 'Friends',
  category: 'social',
  description: 'Social hub for managing friends, sending/receiving lives, and viewing progress.',
  logic: [
    'Lists connected friends with levels and status',
    'Send and receive life gifts',
    'Challenge friends to beat your score',
    'Invite new friends for rewards',
  ],
  conditions: [
    'Always accessible',
    'Facebook/social login for friend sync',
  ],
  inputs: [
    { name: 'friends', type: 'Friend[]', description: 'Connected friends list' },
    { name: 'pendingGifts', type: 'Gift[]', description: 'Lives to claim' },
  ],
  outputs: [
    { action: 'Send Life', effect: 'Send life gift to friend' },
    { action: 'Claim Gift', effect: 'Add received lives' },
    { action: 'Visit Friend', effect: 'View friend profile/progress' },
    { action: 'Invite', effect: 'Open invite flow' },
  ],
  metrics: [
    'Lives sent/received',
    'Friend count growth',
    'Invite conversion rate',
  ],
  edgeCases: [
    'Not connected: Show connect prompt',
    'No friends: Show invite incentive',
  ],
  relatedScreens: ['main-menu', 'leaderboard', 'free-lives'],
};

const leaderboard: ScreenMetadata = {
  id: 'leaderboard',
  name: 'Leaderboard',
  category: 'social',
  description: 'Weekly level completion rankings among friends and global players.',
  logic: [
    'Ranks players by levels completed this week',
    'Separate tabs for friends and global',
    'Awards prizes to top ranks at week end',
    'Resets weekly',
  ],
  conditions: [
    'Always accessible',
  ],
  inputs: [
    { name: 'friendRankings', type: 'Player[]', description: 'Friend leaderboard' },
    { name: 'globalRankings', type: 'Player[]', description: 'Global leaderboard' },
    { name: 'playerRank', type: 'number', description: 'Current player rank' },
  ],
  outputs: [
    { action: 'View Profile', effect: 'Open player profile' },
    { action: 'Challenge', effect: 'Start competitive play' },
  ],
  metrics: [
    'Leaderboard view rate',
    'Competition engagement',
    'Rank improvement rate',
  ],
  edgeCases: [
    'Tied ranks: Show both at same position',
    'New player: Start at bottom',
  ],
  relatedScreens: ['friends', 'profile', 'main-menu'],
};

const profile: ScreenMetadata = {
  id: 'profile',
  name: 'Profile',
  category: 'social',
  description: 'Player profile showing progress, achievements, and settings.',
  logic: [
    'Displays player stats and progress',
    'Shows achievement badges',
    'Allows avatar and name customization',
  ],
  conditions: [
    'Always accessible',
  ],
  inputs: [
    { name: 'player', type: 'Player', description: 'Player data' },
    { name: 'achievements', type: 'Achievement[]', description: 'Earned achievements' },
    { name: 'stats', type: 'Stats', description: 'Gameplay statistics' },
  ],
  outputs: [
    { action: 'Edit Profile', effect: 'Open edit modal' },
    { action: 'View Achievement', effect: 'Show achievement details' },
  ],
  metrics: [
    'Profile view rate',
    'Customization engagement',
  ],
  edgeCases: [
    'Guest player: Limited customization',
  ],
  relatedScreens: ['settings', 'friends', 'main-menu'],
};

const royalPass: ScreenMetadata = {
  id: 'royal-pass',
  name: 'Royal Pass',
  category: 'liveops',
  description: 'Season pass with free and premium reward tracks. Progress by completing levels.',
  logic: [
    'Shows current progress on reward track',
    'Free track available to all players',
    'Premium track requires purchase',
    'Each level win adds progress points',
  ],
  conditions: [
    'Event is active (seasonal)',
    'Player level >= 10',
  ],
  unlockLevel: 10,
  inputs: [
    { name: 'progress', type: 'number', description: 'Current progress points' },
    { name: 'tier', type: 'number', description: 'Current tier on track' },
    { name: 'isPremium', type: 'boolean', description: 'Has premium pass' },
  ],
  outputs: [
    { action: 'Claim Reward', effect: 'Add tier reward to inventory' },
    { action: 'Buy Premium', effect: 'Open purchase flow for premium pass' },
  ],
  metrics: [
    'Premium purchase rate',
    'Avg tier reached',
    'Claim rate by tier',
  ],
  edgeCases: [
    'Event ends: Award unclaimed rewards',
    'Buy premium late: Unlock all previous premium rewards',
  ],
  relatedScreens: ['main-menu', 'reward-claim', 'shop'],
};

const settings: ScreenMetadata = {
  id: 'settings',
  name: 'Settings',
  category: 'main',
  description: 'App settings including sound, notifications, account, and support.',
  logic: [
    'Toggle sound effects and music',
    'Manage push notification preferences',
    'Link/unlink social accounts',
    'Access support and legal info',
  ],
  conditions: [
    'Always accessible',
  ],
  inputs: [
    { name: 'soundEnabled', type: 'boolean', description: 'Sound effects toggle state' },
    { name: 'musicEnabled', type: 'boolean', description: 'Music toggle state' },
    { name: 'notificationsEnabled', type: 'boolean', description: 'Push notifications state' },
  ],
  outputs: [
    { action: 'Toggle Sound', effect: 'soundEnabled = !soundEnabled' },
    { action: 'Toggle Music', effect: 'musicEnabled = !musicEnabled' },
    { action: 'Link Account', effect: 'Open social auth flow' },
    { action: 'Contact Support', effect: 'Open support form' },
  ],
  metrics: [
    'Setting change rate',
    'Support contact rate',
  ],
  edgeCases: [
    'Permission denied: Show system settings prompt',
  ],
  relatedScreens: ['main-menu', 'profile'],
};

const inbox: ScreenMetadata = {
  id: 'inbox',
  name: 'Inbox',
  category: 'social',
  description: 'Message center for gifts, rewards, and system notifications.',
  logic: [
    'Lists all pending items to claim',
    'Groups by type (gifts, rewards, news)',
    'Items expire after X days',
    'Claim all option for bulk claiming',
  ],
  conditions: [
    'Always accessible',
    'Badge shows unread count',
  ],
  inputs: [
    { name: 'items', type: 'InboxItem[]', description: 'Pending inbox items' },
    { name: 'unreadCount', type: 'number', description: 'Number of new items' },
  ],
  outputs: [
    { action: 'Claim Item', effect: 'Add reward, remove from inbox' },
    { action: 'Claim All', effect: 'Bulk claim all items' },
    { action: 'Delete Item', effect: 'Remove without claiming' },
  ],
  metrics: [
    'Claim rate',
    'Time to claim',
    'Expired items rate',
  ],
  edgeCases: [
    'Inbox full: Prioritize valuable items',
    'Item expired: Show expired state',
  ],
  relatedScreens: ['main-menu', 'friends', 'reward-claim'],
};

const skyRace: ScreenMetadata = {
  id: 'sky-race',
  name: 'Sky Race',
  category: 'liveops',
  description: 'Competitive race event where players advance on a track by winning levels.',
  unlockLevel: 15,
  logic: [
    'Players race on a shared track',
    'Each level win moves player forward',
    'First to finish wins grand prize',
    'Consolation prizes for all participants',
  ],
  conditions: [
    'Event is active',
    'Player level >= 15',
  ],
  inputs: [
    { name: 'position', type: 'number', description: 'Current track position' },
    { name: 'competitors', type: 'Player[]', description: 'Other racers' },
    { name: 'finishLine', type: 'number', description: 'Track length' },
  ],
  outputs: [
    { action: 'Play', effect: 'Start level, advance on win' },
    { action: 'View Rankings', effect: 'Show race standings' },
  ],
  metrics: [
    'Race completion rate',
    'Avg position',
    'Play frequency during event',
  ],
  edgeCases: [
    'Tie at finish: Both win',
    'Event ends mid-race: Award based on position',
  ],
  relatedScreens: ['main-menu', 'gameplay', 'reward-claim'],
};

const kingsCup: ScreenMetadata = {
  id: 'kings-cup',
  name: "King's Cup",
  category: 'liveops',
  description: 'Tournament-style event with bracket elimination and grand prizes.',
  unlockLevel: 40,
  logic: [
    'Players compete in brackets',
    'Win matches to advance',
    'Lose and you are eliminated',
    'Finals award premium rewards',
  ],
  conditions: [
    'Tournament is active',
    'Player qualified or registered',
  ],
  inputs: [
    { name: 'bracket', type: 'Bracket', description: 'Current tournament bracket' },
    { name: 'round', type: 'number', description: 'Current round' },
    { name: 'opponent', type: 'Player', description: 'Current match opponent' },
  ],
  outputs: [
    { action: 'Play Match', effect: 'Start competitive level' },
    { action: 'View Bracket', effect: 'Show full tournament bracket' },
  ],
  metrics: [
    'Tournament participation rate',
    'Avg rounds survived',
    'Champion distribution',
  ],
  edgeCases: [
    'Opponent no-show: Auto-advance',
    'Disconnect: Allow reconnect window',
  ],
  relatedScreens: ['main-menu', 'gameplay', 'leaderboard'],
};

// =============================================================================
// METADATA REGISTRY
// =============================================================================

export const SCREEN_METADATA: ScreenMetadataRegistry = {
  // Priority 1: Core Gameplay
  'main-menu': mainMenu,
  'gameplay': gameplay,
  'level-start': levelStart,
  'level-complete': levelComplete,
  'level-failed': levelFailed,
  'out-of-lives': outOfLives,
  'booster-select': boosterSelect,
  'reward-claim': rewardClaim,

  // Priority 2: Winning Streak Modules
  'winning-streak': winningStreak,
  'clef-collection': clefCollection,

  // Priority 3: Monetization
  'shop': shop,
  'free-lives': freeLives,

  // Priority 4: Social & Events
  'team': team,
  'team-chest': teamChest,
  'friends': friends,
  'leaderboard': leaderboard,
  'profile': profile,
  'royal-pass': royalPass,
  'settings': settings,
  'inbox': inbox,
  'sky-race': skyRace,
  'kings-cup': kingsCup,
};

/**
 * Get screen metadata by ID
 */
export function getScreenMetadata(screenId: string): ScreenMetadata | undefined {
  return SCREEN_METADATA[screenId];
}

/**
 * Get all screen IDs with metadata
 */
export function getScreensWithMetadata(): string[] {
  return Object.keys(SCREEN_METADATA);
}
