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
      .then((b: BioModel) => this.getBioById(b.id));
  }

  updateBio(updateObj: BioAddModel) {
    return Bio.update(updateObj)
      .then((result: [number, BioModel[]]) => this.getBioById(result[1][0].id));
  }

  getBio({ UserId }: BioAddModel) {
    return Bio.findOne({ where: { UserId } })
      .then((b): BioViewModel | Object => {
        const bio = b ? this.getBioById(b.id) : false;
        if (!bio) {
          return { error: 'Bio not found' };
        }

        return bio;
      });
  }

  getBioById(id: number) {
    return Bio.findById(id, {
      attributes: BioService.bioAttributes,
    }) as Bluebird<BioViewModel>;
  }
}
