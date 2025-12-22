'use client';

/**
 * Mini Screen Renderer
 *
 * Renders actual page components at a small scale for flowchart thumbnails.
 * For modals, shows a styled placeholder since they have complex props.
 */

import { memo, Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { PageId, ModalId } from '@/types';

// Lazy load page components for the mini renderer
const pageComponentsMap: Record<string, React.ComponentType> = {
  'main-menu': dynamic(() => import('@/components/menus/MainMenu').then(m => ({ default: m.MainMenu })), { ssr: false }),
  'shop': dynamic(() => import('@/components/menus/ShopPage').then(m => ({ default: m.ShopPage })), { ssr: false }),
  'settings': dynamic(() => import('@/components/menus/SettingsPage').then(m => ({ default: m.SettingsPage })), { ssr: false }),
  'team': dynamic(() => import('@/components/menus/TeamPage').then(m => ({ default: m.TeamPage })), { ssr: false }),
  'inbox': dynamic(() => import('@/components/menus/InboxPage').then(m => ({ default: m.InboxPage })), { ssr: false }),
  'leaderboard': dynamic(() => import('@/components/menus/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })), { ssr: false }),
  'daily-rewards': dynamic(() => import('@/components/menus/DailyRewardsPage').then(m => ({ default: m.DailyRewardsPage })), { ssr: false }),
  'profile': dynamic(() => import('@/components/menus/ProfilePage').then(m => ({ default: m.ProfilePage })), { ssr: false }),
  'friends': dynamic(() => import('@/components/menus/FriendsPage').then(m => ({ default: m.FriendsPage })), { ssr: false }),
  'boosters': dynamic(() => import('@/components/menus/BoostersPage').then(m => ({ default: m.BoostersPage })), { ssr: false }),
  'area-tasks': dynamic(() => import('@/components/menus/AreaTasksPage').then(m => ({ default: m.AreaTasksPage })), { ssr: false }),
  'gameplay': dynamic(() => import('@/components/menus/GameplayPage').then(m => ({ default: m.GameplayPage })), { ssr: false }),
  'royal-pass': dynamic(() => import('@/components/liveops/RoyalPassPage').then(m => ({ default: m.RoyalPassPage })), { ssr: false }),
  'sky-race': dynamic(() => import('@/components/liveops/SkyRacePage').then(m => ({ default: m.SkyRacePage })), { ssr: false }),
  'kings-cup': dynamic(() => import('@/components/liveops/KingsCupPage').then(m => ({ default: m.KingsCupPage })), { ssr: false }),
  'team-chest': dynamic(() => import('@/components/liveops/TeamChestPage').then(m => ({ default: m.TeamChestPage })), { ssr: false }),
  'clef-collection': dynamic(() => import('@/components/liveops/ClefCollectionPage').then(m => ({ default: m.ClefCollectionPage })), { ssr: false }),
  'lightning-rush': dynamic(() => import('@/components/liveops/LightningRushPage').then(m => ({ default: m.LightningRushPage })), { ssr: false }),
  'lava-quest': dynamic(() => import('@/components/liveops/LavaQuestPage').then(m => ({ default: m.LavaQuestPage })), { ssr: false }),
  'mission-control': dynamic(() => import('@/components/liveops/MissionControlPage').then(m => ({ default: m.MissionControlPage })), { ssr: false }),
  'winning-streak': dynamic(() => import('@/components/liveops/WinningStreakPage').then(m => ({ default: m.WinningStreakPage })), { ssr: false }),
  'album': dynamic(() => import('@/components/liveops/AlbumPage').then(m => ({ default: m.AlbumPage })), { ssr: false }),
  'collection': dynamic(() => import('@/components/liveops/CollectionPage').then(m => ({ default: m.CollectionPage })), { ssr: false }),
};

// Modal display names and icons (simpler than rendering actual modals)
const modalInfo: Record<string, { name: string; icon: string }> = {
  'level-start': { name: 'Level Start', icon: '🎮' },
  'level-complete': { name: 'Level Complete', icon: '🎉' },
  'level-failed': { name: 'Level Failed', icon: '💔' },
  'out-of-lives': { name: 'Out of Lives', icon: '❤️‍🩹' },
  'booster-select': { name: 'Booster Select', icon: '🚀' },
  'reward-claim': { name: 'Reward Claim', icon: '🎁' },
  'free-lives': { name: 'Free Lives', icon: '💚' },
};

interface MiniScreenRendererProps {
  pageId?: PageId;
  modalId?: ModalId;
  width?: number;
  height?: number;
}

// Loading placeholder
function LoadingPlaceholder({ width, height }: { width: number; height: number }) {
  return (
    <div
      className="bg-bg-muted rounded flex items-center justify-center animate-pulse"
      style={{ width, height }}
    >
      <div className="w-6 h-6 rounded-full bg-bg-card" />
    </div>
  );
}

// Modal placeholder (styled representation)
function ModalPlaceholder({ modalId, width, height }: { modalId: string; width: number; height: number }) {
  const info = modalInfo[modalId] || { name: modalId, icon: '💬' };

  return (
    <div
      className="bg-bg-muted rounded-lg flex flex-col items-center justify-center border border-border/50"
      style={{ width, height }}
    >
      <span className="text-3xl mb-2">{info.icon}</span>
      <span className="text-mini text-text-muted text-center px-2 leading-tight">{info.name}</span>
    </div>
  );
}

// Error fallback
function ErrorFallback({ width, height, label }: { width: number; height: number; label: string }) {
  return (
    <div
      className="bg-bg-muted rounded flex flex-col items-center justify-center text-text-muted"
      style={{ width, height }}
    >
      <span className="text-2xl mb-1">📱</span>
      <span className="text-mini truncate max-w-full px-1">{label}</span>
    </div>
  );
}

export const MiniScreenRenderer = memo(function MiniScreenRenderer({
  pageId,
  modalId,
  width = 100,
  height = 160,
}: MiniScreenRendererProps) {
  // For modals, show a styled placeholder
  if (modalId) {
    return <ModalPlaceholder modalId={modalId} width={width} height={height} />;
  }

  // Get the page component to render
  const Component = useMemo(() => {
    if (pageId && pageComponentsMap[pageId]) {
      return pageComponentsMap[pageId];
    }
    return null;
  }, [pageId]);

  // Calculate scale to fit content
  const baseWidth = 390; // Standard mobile width
  const baseHeight = 844; // Standard mobile height
  const scale = Math.min(width / baseWidth, height / baseHeight);

  if (!Component) {
    return <ErrorFallback width={width} height={height} label={pageId || 'Unknown'} />;
  }

  return (
    <div
      className="overflow-hidden rounded bg-bg-page relative"
      style={{ width, height }}
    >
      <Suspense fallback={<LoadingPlaceholder width={width} height={height} />}>
        <div
          className="origin-top-left pointer-events-none select-none"
          style={{
            width: baseWidth,
            height: baseHeight,
            transform: `scale(${scale})`,
          }}
        >
          <div className="w-full h-full bg-bg-page">
            <Component />
          </div>
        </div>
      </Suspense>

      {/* Gradient overlay to indicate it's a preview */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
});
