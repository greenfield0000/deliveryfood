
/** Flat node with expandable and level information */
export class MenuFlatNode {
    constructor(
        public expandable: boolean,
        public name: string,
        public level: number,
        public pathOfDash: string,
        public image: String) { }
}
