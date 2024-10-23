export function hasEmptyInStringList(list: string[]) {
  return list.filter(data => data.length === 0).length > 0;
}