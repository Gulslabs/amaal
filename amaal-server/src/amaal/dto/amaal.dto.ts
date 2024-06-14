export enum AmaalCategory {
  ZIKR = 'ZIKR',
  TAHAJJUD = 'TAHAJJUD',
  ASTAGFAR = 'ASTAGFAR',
  SADAQAH = 'SADAQAH',
  ROZA = 'ROZA',
  FAJR = 'FAJR',
}
export enum AmaalKind {
  TIME_BASED = 'TIME_BASED',
  BOOL_BASED = 'BOOL_BASED',
}

export class DayAmaalDto {
  date: Date;
  isEditable: boolean = false;
  amaals: AmaalDto[] = [];
  addAmaal(amaal: AmaalDto) {
    this.amaals.push(amaal);
  }
}

export class AmaalDto {
  category: AmaalCategory;
  kind: AmaalKind;
  perfomed: boolean;
  duration?: number;

  constructor(
    category: AmaalCategory,
    kind: AmaalKind,
    duration?: number,
    performed: boolean = false,
  ) {
    this.category = category;
    this.kind = kind;
    //this.setPerformedAndDuration(category, kind, duration);
    if (Number.isInteger(duration)) {
      this.duration = duration;
    }
    this.perfomed = performed
  }

  // private setPerformedAndDuration(
  //   category: AmaalCategory,
  //   kind: AmaalKind,
  //   duration?: number,
  // ): void {
  //   if (
  //     category === AmaalCategory.ZIKR ||
  //     category === AmaalCategory.TAHAJJUD ||
  //     category === AmaalCategory.ASTAGFAR
  //   ) {
  //     if (kind !== AmaalKind.TIME_BASED) {
  //       throw new Error(`Category ${category} must be TIME_BASED`);
  //     }
  //     if (
  //       duration === undefined ||
  //       !Number.isInteger(duration) ||
  //       duration < 1
  //     ) {
  //       throw new Error(
  //         `A positive whole number duration must be provided for ${category}`,
  //       );
  //     }
  //     this.duration = duration;
  //     this.perfomed = true;
  //   } else if (
  //     category === AmaalCategory.SADAQAH ||
  //     category === AmaalCategory.ROZA ||
  //     category === AmaalCategory.FAJR
  //   ) {
  //     if (kind !== AmaalKind.BOOL_BASED) {
  //       throw new Error(`Category ${category} must be BOOL_BASED`);
  //     }
  //     if (duration !== undefined) {
  //       throw new Error(`Duration should not be set for ${category}`);
  //     }
  //     this.perfomed = true;
  //   } else {
  //     throw new Error(`Invalid category: ${category}`);
  //   }
  // }
}
