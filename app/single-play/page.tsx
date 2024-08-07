'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ActionArea from '@/components/areas/action-area';
import HandCardArea from '@/components/areas/hand-card-area';
import MainPlayArea from '@/components/areas/main-play-area';
import PlayerInfoArea from '@/components/areas/player-info-area';
import HoverTip from '@/components/hover-tip';
import { RuleModal } from '@/components/modals/rule-modal';
import useSinglePlay from '@/hooks/useSinglePlay';
import { MAX_CARD_COUNT } from '@/models/Room';
import { useAlertDialogStore } from '@/providers/alert-dialog-store-provider';

export default function SinglePlayPage() {
  const [bestScore, setBestScore] = useState<number>();
  const [isOpenRuleModal, setIsOpenRuleModal] = useState(false);

  // 需要棄牌
  const [needDiscard, setNeedDiscard] = useState(false);

  const router = useRouter();
  const {
    roomInfo,
    onPlayCard,
    onDrawCard,
    onDiscardCard,
    onSelectCardOrSymbol,
    onReselect,
    checkAnswerCorrect,
    isSymbolScoreAnimationFinished,
    selectedCardSymbols,
    selectedCardNumbers,
    onUpdateScore,
    isGameOver,
    onFinishedSymbolScoreAnimation,
    onBack,
    isLastRound,
  } = useSinglePlay();

  const currentPlayer = roomInfo?.players[0];
  const handCard = currentPlayer?.handCard || [];

  const { onOpen, isConfirmed, onReset } = useAlertDialogStore(state => state);

  const disabledActions =
    needDiscard || checkAnswerCorrect === true || !!isGameOver;

  useEffect(() => {
    if (isConfirmed) {
      router.push('/');
      onReset();
    }
  }, [isConfirmed, onReset, router]);

  useEffect(() => {
    if (handCard.length > MAX_CARD_COUNT) {
      setTimeout(() => {
        toast.error('請點選 1 張牌棄掉');
        setNeedDiscard(true);
      }, 500);
    }
  }, [handCard.length]);

  useEffect(() => {
    if (roomInfo?.isGameOver) {
      const currentScore = roomInfo?.players[0].score;
      if (!bestScore || bestScore < currentScore) {
        localStorage.setItem('bestScore', String(currentScore));
      }
      toast.success(`遊戲結束，總分為 ${currentScore} 分`, {
        autoClose: 5000,
      });
    }
  }, [bestScore, roomInfo]);

  useEffect(() => {
    const score = localStorage.getItem('bestScore');
    if (score) {
      setBestScore(Number(score));
    }
  }, []);

  return (
    <>
      <RuleModal isOpen={isOpenRuleModal} onOpenChange={setIsOpenRuleModal} />
      <div className="relative flex w-full basis-1/5">
        <div className="absolute right-5 top-5 flex gap-5">
          {/* 再來一局 */}
          {isGameOver && (
            <HoverTip content="再來一局">
              <Image
                src="/replay.svg"
                alt="replay"
                width={30}
                height={30}
                priority
                onClick={() => window.location.reload()}
              />
            </HoverTip>
          )}
          {/* 遊戲規則 */}
          <HoverTip content="遊戲規則">
            <Image
              src="/document.svg"
              alt="document"
              width={24}
              height={24}
              priority
              onClick={() => setIsOpenRuleModal(true)}
            />
          </HoverTip>
          {/* 返回首頁 */}
          <HoverTip content="回首頁">
            <Image
              src="/leave.svg"
              alt="leave"
              width={28}
              height={28}
              priority
              onClick={() =>
                onOpen({
                  title: '回到首頁',
                  description: isGameOver
                    ? '離開遊戲回到首頁'
                    : '離開遊戲後，當前進度將會消失，確定要離開嗎？',
                })
              }
            />
          </HoverTip>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col items-center gap-8 max-sm:gap-2">
        <MainPlayArea
          checkAnswerCorrect={checkAnswerCorrect}
          selectedCards={roomInfo?.selectedCards}
          isSymbolScoreAnimationFinished={isSymbolScoreAnimationFinished}
          onFinishedSymbolScoreAnimation={onFinishedSymbolScoreAnimation}
          onUpdateScore={onUpdateScore}
          selectedCardSymbols={selectedCardSymbols}
          selectedCardNumbers={selectedCardNumbers}
          onSelectSymbol={symbol => onSelectCardOrSymbol({ symbol })}
        />
      </div>
      <div className="relative flex w-full basis-1/5">
        <PlayerInfoArea
          isSinglePlay={true}
          bestScore={bestScore}
          isLastRoundPlayer={currentPlayer?.isLastRoundPlayer}
          remainCards={roomInfo?.deck.length}
          score={currentPlayer?.score}
        />
        <HandCardArea
          selectedCards={roomInfo?.selectedCards || []}
          handCard={handCard}
          needDiscard={needDiscard}
          onSelect={number => onSelectCardOrSymbol({ number })}
          onDiscard={id => {
            setNeedDiscard(false);
            onDiscardCard(id);
          }}
        />
        <ActionArea
          disabledActions={disabledActions}
          onSubmit={onPlayCard}
          onReselect={onReselect}
          onEndPhase={() => {
            onReselect();
            onDrawCard();
          }}
          onBack={onBack}
          selectedCards={roomInfo?.selectedCards || []}
          isLastRound={isLastRound}
        />
      </div>
    </>
  );
}
