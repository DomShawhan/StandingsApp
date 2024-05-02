export class MenuItem {
    title: string;
    href: string;
    tooltip: string;

    constructor(
        title: string = '',
        href: string = '',
        tooltip: string = ''
    ) {
        this.title = title;
        this.href = href;
        this.tooltip = tooltip;
    }
}