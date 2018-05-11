import {Component} from "@angular/core";
import {HomePage} from "../home/home";
import {BossHomePage} from "../boss/boss-home/boss-home";
import {MoreHomePage} from "../more/more-home/more-home";
import {DiscoverHomePage} from "../discover/discover-home/discover-home";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = BossHomePage;
    tab3Root: any = DiscoverHomePage
    tab4Root: any = MoreHomePage;

    constructor() {
    }
}
