import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';
import { NumberCard } from '@/models/Player';
import { Symbol } from '@/models/Symbol';

export type SelectedCard = {
  number?: NumberCard;
  symbol?: Symbol;
};

const useGame = () => {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  const onSelectCardOrSymbol = ({
    number,
    symbol,
  }: {
    number?: NumberCard;
    symbol?: Symbol;
  }) => {
    if (
      selectedCards.length === 0 &&
      symbol &&
      [Symbol.Plus, Symbol.Times, Symbol.Divide, Symbol.RightBracket].includes(
        symbol,
      )
    ) {
      toast({ variant: 'destructive', title: '第一個符號只能用減號或左括號' });
      return;
    }
    if (number) {
      setSelectedCards(state => {
        const isExist = state.find(c => c.number?.id === number.id);
        if (isExist) {
          return state.filter(c => c.number?.id !== number.id);
        }
        return [...state, { number }];
      });
    }
    if (symbol) {
      setSelectedCards(state => [...state, { symbol }]);
    }
  };

  const onReselect = () => {
    setSelectedCards([]);
  };

  const showCurrentSelect = () => {
    return selectedCards.map((card, index) => {
      if (card.symbol) {
        switch (card.symbol) {
          case Symbol.Plus:
            return (
              <Image
                key={`${index}-${card}`}
                src="/plus.svg"
                alt="plus"
                width={52}
                height={52}
                priority
              />
            );
          case Symbol.Minus:
            return (
              <Image
                key={`${index}-${card}`}
                src="/minus.svg"
                alt="minus"
                width={52}
                height={52}
                priority
              />
            );
          case Symbol.Times:
            return (
              <Image
                key={`${index}-${card}`}
                src="/times.svg"
                alt="times"
                width={52}
                height={52}
                priority
              />
            );
          case Symbol.Divide:
            return (
              <Image
                key={`${index}-${card}`}
                src="/divide.svg"
                alt="divide"
                width={52}
                height={52}
                priority
              />
            );
          case Symbol.LeftBracket:
          case Symbol.RightBracket:
            return (
              <span key={`${index}-${card}`} className="text-4xl">
                {card.symbol}
              </span>
            );
          default:
            return '';
        }
      } else {
        return (
          <span
            key={`${index}-${card}`}
            className="text-4xl"
            style={{ marginTop: '2px' }}
          >
            {card.number?.value}
          </span>
        );
      }
    });
  };

  return {
    // handCards,
    selectedCards,
    onSelectCardOrSymbol,
    onReselect,
    showCurrentSelect,
  };
};

export default useGame;
