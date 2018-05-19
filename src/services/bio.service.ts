import { default as Bluebird } from 'bluebird';

import { Bio, BioModel, BioAddModel, BioViewModel } from '../db/models/userBio';

export class BioService {
  static get bioAttributes() {
    return ['firstName', 'lastName', 'dob'];
  }

  private static _bio : Bluebird<BioModel | null>;

  static get bio() {
    return BioService._bio;
  }

  setBio({ firstName, lastName, dob, UserId }: BioAddModel) {
    return Bio.create({ firstName, lastName, dob, UserId })
      .then((b: BioModel) => this.getBioByUserId(b.id));
  }

  updateBio(updateObj: BioAddModel) {
    return Bio.update(updateObj)
      .then((result: [number, BioModel[]]) => this.getBioByUserId(result[1][0].id));
  }

  getBio({ UserId }: BioAddModel) {
    return Bio.findOne({ where: { UserId } })
      .then(async (b) => {
        const bio = b && await this.getBioByUserId(b.id);

        return bio;
      });
  }

  getBioByUserId(id: number) {
    return Bio.findById(id, {
      attributes: BioService.bioAttributes,
    }) as Bluebird<BioViewModel>;
  }
}
