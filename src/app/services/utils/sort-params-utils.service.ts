import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortParamsUtils {
  constructor() {}

  public updateSortParams(
    sortParams: string[],
    triggeredSortProperty: string
  ): string[] {
    let newSortParams = [...sortParams];
    if (newSortParams.includes(triggeredSortProperty)) {
      newSortParams.splice(newSortParams.indexOf(triggeredSortProperty), 1);
      newSortParams.push(`${triggeredSortProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredSortProperty},asc`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredSortProperty},asc`),
        1
      );
      newSortParams.push(`${triggeredSortProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredSortProperty},ASC`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredSortProperty},ASC`),
        1
      );
      newSortParams.push(`${triggeredSortProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredSortProperty},desc`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredSortProperty},desc`),
        1
      );
    } else if (newSortParams.includes(`${triggeredSortProperty},DESC`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredSortProperty},DESC`),
        1
      );
    } else {
      newSortParams.push(`${triggeredSortProperty},ASC`);
    }
    return newSortParams;
  }

  public isSortedByPropertyASC(
    sortParams: string[],
    property: string
  ): boolean {
    return (
      sortParams.includes(property) ||
      sortParams.includes(`${property},asc`) ||
      sortParams.includes(`${property},ASC`)
    );
  }

  public isSortedByPropertyDESC(
    sortParams: string[],
    property: string
  ): boolean {
    return (
      sortParams.includes(`${property},desc`) ||
      sortParams.includes(`${property},DESC`)
    );
  }
}
