import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeVariants } from '@/lib/animation-variants';
import { NumberCard } from '@/models/Player';
import { HAND_CARD_COUNT } from '@/models/Room';
import { SelectedCard } from '@/models/SelectedCard';
import GameCard from '../game-card';

type HandCardAreaProps = {
  selectedCards: SelectedCard[];
  handCard?: NumberCard[];
  needDiscard: boolean;
  onSelect: (number: NumberCard) => void;
  onDiscard: (id: string) => void;
};

const HandCardArea = ({
  selectedCards,
  handCard = [],
  needDiscard = false,
  onSelect,
  onDiscard,
}: HandCardAreaProps) => {
  const [noDrawCardDelay, setNoDrawCardDelay] = useState(false);
  const handCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 初始化後取消動畫延遲
    if (handCard.length === HAND_CARD_COUNT && !noDrawCardDelay) {
      setTimeout(() => {
        setNoDrawCardDelay(true);
      }, HAND_CARD_COUNT * 0.2);
    }
    if (handCardsRef.current) {
      handCardsRef.current.scrollLeft += 400;
    }
  }, [handCard, noDrawCardDelay]);

  const getSelectedCardIndex = (id: string) => {
    return selectedCards
      .filter(c => c.number)
      .findIndex(c => {
        return c.number?.id === id;
      });
  };

  return (
    <>
      {needDiscard && (
        <div className="absolute left-1/2 -translate-x-2/4 text-sm text-red-600 max-sm:bottom-1 sm:bottom-2 md:bottom-1 lg:-top-1">
          請點選 1 張牌丟棄
        </div>
      )}
      <div
        className="flex flex-1 items-center overflow-x-auto scroll-smooth"
        ref={handCardsRef}
      >
        <div className="m-auto flex gap-4">
          {handCard.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative"
              variants={fadeVariants}
              transition={{
                delay: noDrawCardDelay ? 0 : index * 0.2,
              }}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 1 }}
            >
              <GameCard
                value={card.value}
                onSelect={() => {
                  if (needDiscard) {
                    onDiscard(card.id);
                  } else {
                    onSelect(card);
                  }
                }}
                selectedCardIndex={getSelectedCardIndex(card.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HandCardArea;
