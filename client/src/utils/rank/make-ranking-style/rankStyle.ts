export function getRankTextColor(rank: number) {
  const defaultStyle = "font-semibold mr-1 min-w-[50px]";
  if (rank === 1) {
    return `${defaultStyle} text-[18px] text-yellow-500 animate-[glow_2s_ease-in-out_infinite]`;
  } else if (rank === 2) {
    return `${defaultStyle} text-[18px] text-gray-500 animate-[glow_2s_ease-in-out_infinite]`;
  } else if (rank === 3) {
    return `${defaultStyle} text-[18px] text-brown-500 animate-[glow_2s_ease-in-out_infinite]`;
  }
  return `${defaultStyle} text-[16px] text-black`;
}

export function getRankUserNameColor(rank: number) {
  const defaultStyle = "text-[16px] flex-1";
  if (rank === 1) {
    return `${defaultStyle} font-bold`;
  } else if (rank === 2) {
    return `${defaultStyle} font-bold`;
  } else if (rank === 3) {
    return `${defaultStyle} font-bold`;
  }
  return `${defaultStyle} text-[16px]`;
}
