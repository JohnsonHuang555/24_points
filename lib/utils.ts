import { type ClassValue, clsx } from 'clsx';
import { evaluate } from 'mathjs';
import { twMerge } from 'tailwind-merge';
import { SelectedCard } from '@/models/SelectedCard';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 計算數字牌分數(顯示用)
export function calculateNumbersScore(numberCards: number) {
  // 用到四張數字牌 額外加一分
  if (numberCards === 4) {
    return 1;
  }

  // 用到五張數字牌 額外加兩分
  if (numberCards === 5) {
    return 2;
  }

  // // 用到六張數字牌 額外加三分
  // if (numberCards === 6) {
  //   return 3;
  // }

  // // 用到七張數字牌 額外加四分
  // if (numberCards === 7) {
  //   return 4;
  // }

  // // 用到八張數字牌 額外加五分
  // if (numberCards === 8) {
  //   return 5;
  // }
}

export function calculateAnswer(selectedCards: SelectedCard[]) {
  const expression = selectedCards.map(s => {
    if (s.number) {
      return s.number.value;
    }
    if (s.symbol) {
      return s.symbol;
    }
  });

  try {
    const answer = evaluate(expression.join(''));
    return answer;
  } catch (error) {
    throw Error('算式有誤');
  }
}
