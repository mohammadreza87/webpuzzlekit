'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGame, useNavigation } from '@/store';

// Avatar options with some locked
const avatarOptions = [
  { id: 1, abbr: 'A1', locked: false },
  { id: 2, abbr: 'A2', locked: false },
  { id: 3, abbr: 'A3', locked: false },
  { id: 4, abbr: 'A4', locked: true },
];

interface ProfileModalProps {
  onAnimatedClose?: () => void;
}

export function ProfileModal({ onAnimatedClose }: ProfileModalProps) {
  const { state } = useGame();
  const { closeModal } = useNavigation();
  const { player } = state;

  // Local state for editing
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(player.username);

  const handleClose = () => {
    if (onAnimatedClose) {
      onAnimatedClose();
    } else {
      closeModal();
    }
  };

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
    handleClose();
  };

  return (
    <div className="relative w-full max-w-[320px]">
      {/* Close button - Top right */}
      <button
        onClick={handleClose}
        className="absolute -top-1 -right-1 w-8 h-8 bg-bg-muted rounded-full flex items-center justify-center border border-border z-10 hover:opacity-80 transition-colors"
      >
        <span className="text-text-primary font-bold text-caption">X</span>
      </button>

      {/* Header */}
      <div className="bg-bg-inverse rounded-t-2xl py-2.5 px-3">
        <h1 className="text-text-inverse text-h4 text-center">Your Profile</h1>
      </div>

      {/* Content */}
      <div className="bg-bg-card rounded-b-2xl border-x-2 border-b-2 border-border p-4">
        {/* Profile Info - Avatar, Name, Level */}
        <div className="flex items-start gap-3 mb-4">
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
        <div className="bg-bg-muted rounded-xl p-3 border border-border mb-4">
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

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-bg-muted hover:bg-bg-page rounded-xl py-3 border-2 border-border transition-colors"
        >
          <span className="text-text-primary text-h3">Save</span>
        </button>
      </div>
    </div>
  );
}
