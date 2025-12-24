'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGame, useNavigation } from '@/store';
import { FeatureDisabled } from '@/components/shared';
import { isFeatureEnabled } from '@/config/features';

// Avatar options with some locked
const avatarOptions = [
  { id: 1, abbr: 'A1', locked: false },
  { id: 2, abbr: 'A2', locked: false },
  { id: 3, abbr: 'A3', locked: false },
  { id: 4, abbr: 'A4', locked: true },
];

export function ProfilePage() {
  const { state } = useGame();
  const { navigate } = useNavigation();

  // Feature flag check (must be after hooks)
  if (!isFeatureEnabled('PROFILES')) {
    return <FeatureDisabled featureName="Profile" />;
  }

  const { player } = state;

  // Local state for editing
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(player.username);

  const handleAvatarSelect = (avatar: typeof avatarOptions[0]) => {
    if (!avatar.locked) {
      setSelectedAvatar(avatar.id);
    }
  };

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    navigate('main-menu');
  };

  const handleClose = () => {
    navigate('main-menu');
  };

  return (
    <div className="flex flex-col h-full bg-bg-inverse">
      {/* Header */}
      <div className="flex items-center justify-center px-3 py-3 bg-bg-muted relative border-b border-border">
        <h1 className="text-text-primary text-h2">Your Profile</h1>
        <button
          onClick={handleClose}
          className="absolute right-3 w-10 h-10 bg-bg-page rounded-full flex items-center justify-center border-2 border-border hover:opacity-80"
        >
          <span className="text-text-primary text-h2">X</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Main Card */}
        <div className="bg-bg-page rounded-xl border-2 border-border p-4">
          {/* Profile Info - Avatar, Name, Level */}
          <div className="flex items-start gap-4 mb-4">
            {/* Current Avatar */}
            <div className="w-20 h-20 bg-bg-muted rounded-xl border-2 border-border flex items-center justify-center flex-shrink-0">
              <span className="text-text-primary text-h1">A{selectedAvatar}</span>
            </div>

            {/* Name and Level */}
            <div className="flex-1 space-y-2">
              {/* Editable Name Field */}
              <div className="bg-bg-muted rounded-lg px-3 py-2.5 flex items-center justify-between border border-border">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    autoFocus
                    className="flex-1 bg-transparent text-text-primary font-bold focus:outline-none"
                    maxLength={20}
                  />
                ) : (
                  <span className="text-text-primary font-bold">{editedName}</span>
                )}
                <button
                  onClick={handleEditName}
                  className="w-7 h-7 bg-bg-page rounded flex items-center justify-center border border-border ml-2 hover:opacity-80"
                >
                  <Image src="/icons/Edit.svg" alt="Edit" width={14} height={14} className="opacity-70" />
                </button>
              </div>

              {/* Level Display */}
              <div className="bg-bg-muted rounded-lg px-3 py-2.5 border border-border">
                <span className="text-text-secondary">Level {player.currentLevel}</span>
              </div>
            </div>
          </div>

          {/* Avatar Selection Grid */}
          <div className="bg-bg-muted rounded-xl p-3 border border-border">
            <div className="grid grid-cols-3 gap-3">
              {avatarOptions.map((avatar) => {
                const isLocked = avatar.locked;
                const isSelected = selectedAvatar === avatar.id;

                return (
                  <button
                    key={avatar.id}
                    onClick={() => handleAvatarSelect(avatar)}
                    disabled={isLocked}
                    className={`relative aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-bg-page border-text-primary'
                        : isLocked
                        ? 'bg-bg-page border-border opacity-70 cursor-not-allowed'
                        : 'bg-bg-page border-border hover:border-text-secondary'
                    }`}
                  >
                    <span className={`text-h2 ${isLocked ? 'text-text-muted' : 'text-text-primary'}`}>
                      {avatar.abbr}
                    </span>

                    {/* Selected Checkmark */}
                    {isSelected && !isLocked && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-text-primary rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-bg-page" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    {/* Lock Icon */}
                    {isLocked && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-bg-muted rounded-full flex items-center justify-center border border-border">
                        <Image src="/icons/Lock.svg" alt="Locked" width={12} height={12} className="opacity-70" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="p-4 bg-bg-inverse border-t border-border">
        <button
          onClick={handleSave}
          className="w-full bg-bg-muted hover:bg-bg-page rounded-xl py-4 border-2 border-border transition-colors"
        >
          <span className="text-text-primary text-h3">Save</span>
        </button>
      </div>
    </div>
  );
}
