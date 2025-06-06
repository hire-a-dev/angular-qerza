
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location, NgClass, PlatformLocation } from '@angular/common';
interface MenuItem {
  label?: string
  title: string;
  icon?: string;
  route?: string;
  badge?: boolean;
  subMenu?: {
    title: string;
    route?: string;
    theme?: string;
    subBadge?: boolean;
    subsubMenu?: { title: string; route: string; }[]
  }[];
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output() newTitleEvent = new EventEmitter<{ title: string }>(); // DashBoard Title
  @Output() mouseHoverEvent = new EventEmitter<string>(); // Data pass Admin page

  email: string = 'marquezzzz@mail.com';
  activeToggle: string = '';
  localData: any = '';
  elementValue: any = '';
  currentHref: string = "";
  public isVisited = false;


  constructor(private router: Router, private location: Location, private backLocation: PlatformLocation) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentHref = location.path();
      } else {
        this.currentHref = '/index'
      }
    });
    backLocation.onPopState(() => {   // back click get url
      this.handleActiveMenu(window.location.pathname);
    });
  }

  ngDoCheck(): void {
    this.elementValue = document.body.getAttribute('data-theme-version');
  }

  getActive(menu: any) {     //  side menu manage
    if (this.activeToggle != menu) {
      this.activeToggle = menu;
    } else {
      this.activeToggle = '';
    }
  }
  hoverAdd(val: any) {
    const getStyle = document.body.getAttribute('data-sidebar-style')
    if (getStyle == 'icon-hover') {
      this.mouseHoverEvent.emit(val);
    }
  }
  checkVisited() {
    this.isVisited = !this.isVisited;
  }
  ngOnInit(): void {
    this.elementValue = document.body.getAttribute('data-theme-version');
    this.handleActiveMenu(this.currentHref);
  }

  themeMode(menu: any) {    // dark-light theme set function
    this.activeSubMenu = '';
    localStorage.setItem("data-theme-version", menu);
    this.localData = localStorage.getItem('data-theme-version');
    this.elementValue = this.localData;
    document.body.setAttribute('data-theme-version', this.localData);
  }

  activeMenu: string = "";
  activeSubMenu: string = "";
  activeSubSubMenu: string = "";

  handleActiveMenu(val: any) {
    this.sidebarMenu.map((data: any, ind: any) => {
      if (data.route == val) {
        this.activeMenu = data.title;
      }
      data.subMenu?.map((item: any, ind: any) => {
        if (item.route == val) {
          this.activeMenu = data.title;
          this.activeSubMenu = item.title;
          this.activeSubSubMenu = "";
        }
        item.subsubMenu?.map((item1: any, ind: any) => {
          if (item1.route == val) {
            this.activeMenu = data.title;
            this.activeSubMenu = item.title;
            this.activeSubSubMenu = item1.title
          }
        })
      })
    })
    this.newTitleEvent.emit({ title: this.activeMenu });
  }

  handleMenu(val: any) {
    if (this.activeMenu == "Chat") {
      this.activeMenu = val;
    } else {
      if (this.activeMenu == val) {
        this.activeMenu = "";
      } else {
        this.activeMenu = val;
      }
    }
  }
  handleActiveSubMenu(val: any) {
    if (this.activeSubMenu == val) {
      this.activeSubMenu = "";
    } else {
      this.activeSubMenu = val;
    }
  }

  sidebarMenu: MenuItem[] = [
    {
      title: "Dashboard",
      icon: "flaticon-381-networking",
      subMenu: [
        {
          title: "Dashboard Light",
          route: "/admin",
          theme: "light"
        },
        {
          title: "Dashboard Dark",
          route: "/admin",
          theme: "dark"
        },
        {
          title: "Search Job",
          route: "/admin/search-job"
        },
        {
          title: "Application",
          route: "/admin/application"
        },
        {
          title: "Profile",
          route: "/admin/profile"
        },
        {
          title: "Statistics",
          route: "/admin/statistics"
        },
        {
          title: "Companies",
          route: "/admin/companies"
        }
      ]
    },
    {
      title: "CMS",
      icon: "flaticon-381-diploma",
      badge: true,
      subMenu: [
        {
          title: "Content",
          route: "/admin/cms-content"
        },
        {
          title: "Add Content",
          route: "/admin/cms-content-add"
        },
        {
          title: "Email Template",
          route: "/admin/cms-email-template"
        },
        {
          title: "Add Email ",
          route: "/admin/cms-email-add"
        },
        {
          title: "Menus",
          route: "/admin/cms-menus"
        },
        {
          title: "Blog",
          route: "/admin/cms-blog"
        },
        {
          title: "Add Blog",
          route: "/admin/cms-blog-add"
        },
        {
          title: "Blog Category",
          route: "/admin/cms-blog-category"
        }
      ]
    },
    {
      title: "Profile",
      badge: true,
      icon: "fa-regular fa-user fw-bold",
      subMenu: [
        {
          title: "Overview",
          route: "/admin/profile/overview"
        },
        {
          title: "Projects",
          route: "/admin/profile/projects"
        },
        {
          title: "Projects Details",
          route: "/admin/profile/projects-details"
        },
        {
          title: "Campaigns",
          route: "/admin/profile/campaigns"
        },
        {
          title: "Documents",
          route: "/admin/profile/documents"
        },
        {
          title: "Followers",
          route: "/admin/profile/followers"
        },
        {
          title: "Activity",
          route: "/admin/profile/activity"
        }
      ]
    },
    {
      title: "Accounts",
      badge: true,
      icon: "flaticon-381-user-4",
      subMenu: [
        {
          title: "Overview",
          route: "/admin/account/overview"
        },
        {
          title: "Settings",
          route: "/admin/account/settings"
        },
        {
          title: "Security",
          route: "/admin/account/security"
        },
        {
          title: "Activity",
          route: "/admin/account/activity"
        },
        {
          title: "Billing",
          route: "/admin/account/billing"
        },
        {
          title: "Statements",
          route: "/admin/account/statements"
        },
        {
          title: "Referrals",
          route: "/admin/account/referrals"
        },
        {
          title: "Api keys",
          route: "/admin/account/api-keys"
        },
        {
          title: "Logs",
          route: "/admin/account/logs"
        }
      ]
    },
    {
      title: "Apps",
      icon: "flaticon-381-television",
      subMenu: [
        {
          title: "Profile",
          route: "/admin/app-profile"
        },
        {
          title: "Post Details",
          route: "/admin/post-details"
        },
        {
          title: "Email",
          subsubMenu: [
            {
              title: "Compose",
              route: "/admin/email-compose"
            },
            {
              title: "Inbox",
              route: "/admin/email-inbox"
            },
            {
              title: "Read",
              route: "/admin/email-read"
            }
          ]
        },
        {
          title: "Calendar",
          route: "/admin/app-calender"
        },
        {
          title: "Shop",
          subsubMenu: [
            {
              title: "Product Grid",
              route: "/admin/ecom-product-grid"
            },
            {
              title: "Product List",
              route: "/admin/ecom-product-list"
            },
            {
              title: "Product Detail",
              route: "/admin/ecom-product-detail"
            },
            {
              title: "Order",
              route: "/admin/ecom-product-order"
            },
            {
              title: "Checkout",
              route: "/admin/ecom-checkout"
            },
            {
              title: "Invoice",
              route: "/admin/ecom-invoice"
            },
            {
              title: "Customers",
              route: "/admin/ecom-customers"
            }
          ]
        }
      ]
    },
    {
      title: "AIKit",
      badge: true,
      icon: "fa-solid fa-robot",
      subMenu: [
        {
          title: "Auto Writer",
          route: "/admin/aikit/auto-writer"
        },
        {
          title: "Scheduled",
          route: "/admin/aikit/scheduled"
        },
        {
          title: "Repurpose",
          route: "/admin/aikit/repurpose"
        },
        {
          title: "RSS",
          route: "/admin/aikit/rss"
        },
        {
          title: "Chatbot",
          route: "/admin/aikit/chatbot"
        },
        {
          title: "Fine-tune Models",
          route: "/admin/aikit/fine-tune-models"
        },
        {
          title: "AI Menu Prompts",
          route: "/admin/aikit/prompt"
        },
        {
          title: "Settings",
          route: "/admin/aikit/setting"
        },
        {
          title: "Export/Import Settings",
          route: "/admin/aikit/import"
        }
      ]
    },
    {
      title: "Charts",
      icon: "flaticon-381-controls-3",
      subMenu: [
        {
          title: "Apex Chart",
          subsubMenu: [
            {
              title: "Area Charts",
              route: "/admin/apex-area"
            },
            {
              title: "Bar Charts",
              route: "/admin/apex-bar"
            },
            {
              title: "Bubble Charts",
              route: "/admin/apex-bubble"
            },
            {
              title: "Candlestick Charts",
              route: "/admin/apex-candlestick"
            },
            {
              title: "Column Charts",
              route: "/admin/apex-column"
            },
            {
              title: "Heatmap Charts",
              route: "/admin/apex-heatmap"
            },
            {
              title: "Line Charts",
              route: "/admin/apex-line"
            },
            {
              title: "Mixed / Combo Charts",
              route: "/admin/apex-mixed"
            },
            {
              title: "Pie / Donuts",
              route: "/admin/apex-pie"
            },
            {
              title: "Polar Area Charts",
              route: "/admin/apex-polar-area"
            },
            {
              title: "Radar Charts",
              route: "/admin/apex-radar"
            },
            {
              title: "RadialBar / Circle Charts",
              route: "/admin/apex-radialbar"
            },
            {
              title: "Scatter Charts",
              route: "/admin/apex-scatter"
            },
            {
              title: "Sparklines Charts",
              route: "/admin/apex-sparklines"
            },
            {
              title: "Timeline Charts",
              route: "/admin/apex-timeline"
            },
            {
              title: "Treemap Charts",
              route: "/admin/apex-treemap"
            }
          ]
        },
        {
          title: "Chartjs",
          subsubMenu: [
            {
              title: "General Chartjs",
              route: "/admin/chartjs-general"
            },
            {
              title: "Animation Charts",
              route: "/admin/chartjs-animation"
            },
            {
              title: "Bar Charts",
              route: "/admin/chartjs-bar"
            },
            {
              title: "Line Charts",
              route: "/admin/chartjs-line"
            },
            {
              title: "Area Charts",
              route: "/admin/chartjs-area"
            },
            {
              title: "Bubble Charts",
              route: "/admin/chartjs-bubble"
            }
          ]
        }
      ]
    },
    {
      title: "Bootstrap",
      icon: "flaticon-381-internet",
      subMenu: [
        {
          title: "Accordion",
          route: "/admin/ui-accordion"
        },
        {
          title: "Alert",
          route: "/admin/ui-alert"
        },
        {
          title: "Badge",
          route: "/admin/ui-badge"
        },
        {
          title: "Button",
          route: "/admin/ui-button"
        },
        {
          title: "Button Group",
          route: "/admin/ui-button-group"
        },
        {
          title: "Card",
          route: "/admin/ui-card"
        },
        {
          title: "Carousel",
          route: "/admin/ui-carousel"
        },
        {
          title: "Dropdown",
          route: "/admin/ui-dropdown"
        },
        {
          title: "Grid",
          route: "/admin/ui-grid"
        },
        {
          title: "List Group",
          route: "/admin/ui-list-group"
        },
        {
          title: "Media Object",
          route: "/admin/ui-media-object"
        },
        {
          title: "Modal",
          route: "/admin/ui-modal"
        },
        {
          title: "Pagination",
          route: "/admin/ui-pagination"
        },
        {
          title: "Popover",
          route: "/admin/ui-popover"
        },
        {
          title: "Progressbar",
          route: "/admin/ui-progressbar"
        },
        {
          title: "Table",
          route: "/admin/ui-table"
        },
        {
          title: "Tab",
          route: "/admin/ui-tab"
        },
        {
          title: "Typography",
          route: "/admin/ui-typography"
        }
      ]
    },
    {
      title: "Material",
      icon: "flaticon-381-layer-1",
      subMenu: [
        {
          title: "Autocomplete",
          route: "/admin/mat-autocomplete"
        },
        {
          title: "Badge",
          route: "/admin/mat-badge"
        },
        {
          title: "Bottom Sheet",
          route: "/admin/mat-bottom-sheet"
        },
        {
          title: "Button",
          route: "/admin/mat-button"
        },
        {
          title: "Button Toggle",
          route: "/admin/mat-button-toggle"
        },
        {
          title: "Card",
          route: "/admin/mat-card"
        },
        {
          title: "Checkbox",
          route: "/admin/mat-checkbox"
        },
        {
          title: "Chips",
          route: "/admin/mat-chips"
        },
        {
          title: "Datepicker",
          route: "/admin/mat-datepicker"
        },
        {
          title: "Dialog",
          route: "/admin/mat-dialog"
        },
        {
          title: "Divider",
          route: "/admin/mat-divider"
        },
        {
          title: "Expansion Panel",
          route: "/admin/mat-expansion"
        },
        {
          title: "Form Field",
          route: "/admin/mat-form-field"
        },
        {
          title: "Grid List",
          route: "/admin/mat-grid-list"
        },
        {
          title: "Icon",
          route: "/admin/mat-icon"
        },
        {
          title: "Input",
          route: "/admin/mat-input"
        },
        {
          title: "List",
          route: "/admin/mat-list"
        },
        {
          title: "Menu",
          route: "/admin/mat-menu"
        },
        {
          title: "Paginator",
          route: "/admin/mat-paginator"
        },
        {
          title: "Progress Bar",
          route: "/admin/mat-progress-bar"
        },
        {
          title: "Progress Spinnere",
          route: "/admin/mat-progress-spinner"
        },
        {
          title: "Radio",
          route: "/admin/mat-radio"
        },
        {
          title: "Ripple",
          route: "/admin/mat-ripple"
        },
        {
          title: "Select",
          route: "/admin/mat-select"
        },
        {
          title: "Sidenav",
          route: "/admin/mat-sidenav"
        },
        {
          title: "Slide Toggle",
          route: "/admin/mat-slide-toggle"
        },
        {
          title: "Slider",
          route: "/admin/mat-slider"
        },
        {
          title: "Snack Bar",
          route: "/admin/mat-snack-bar"
        },
        {
          title: "Sort Header",
          route: "/admin/mat-sort"
        },
        {
          title: "Stepper",
          route: "/admin/mat-stepper"
        },
        {
          title: "Table",
          route: "/admin/mat-table"
        },
        {
          title: "Tab",
          route: "/admin/mat-tab"
        },
        {
          title: "Toolbar",
          route: "/admin/mat-toolbar"
        },
        {
          title: "Tooltip",
          route: "/admin/mat-tooltip"
        },
        {
          title: "Tree",
          route: "/admin/mat-tree"
        }
      ]
    },
    {
      title: "Plugins",
      icon: "flaticon-381-heart",
      subMenu: [
        {
          title: "Sweet Alert",
          route: "/admin/uc-sweet-alert"
        },
        {
          title: "Toastr",
          route: "/admin/uc-toastr"
        },
        {
          title: "Light Gallery",
          route: "/admin/uc-light-gallery"
        }
      ]
    },
    {
      title: "Widget",
      icon: "flaticon-381-settings-2",
      subMenu: [
        {
          title: "Wg Card",
          route: "/admin/widget-card"
        },
        {
          title: "Wg Chart",
          route: "/admin/widget-chart"
        },
        {
          title: "Wg List",
          route: "/admin/widget-list"
        }
      ]
    },
    {
      title: "Forms",
      icon: "flaticon-381-notepad",
      subMenu: [
        {
          title: "Form Elements",
          route: "/admin/form-element"
        },
        {
          title: "CkEditor",
          route: "/admin/form-editor"
        },
        {
          title: "Picker",
          route: "/admin/form-picker"
        },
        {
          title: "Form Validation",
          route: "/admin/form-validation"
        }
      ]
    },
    {
      title: "Pages",
      icon: "flaticon-381-layer-1",
      subMenu: [
        {
          title: "Register",
          route: "/page-register"
        },
        {
          title: "Login",
          route: "/page-login"
        },
        {
          title: "Forgot Password",
          route: "/page-forgot-password"
        },
        {
          title: "Error",
          subsubMenu: [
            {
              title: "Error 400",
              route: "/page-error-400"
            },
            {
              title: "Error 403",
              route: "/page-error-403"
            },
            {
              title: "Error 404",
              route: "/page-error-404"
            },
            {
              title: "Error 500",
              route: "/page-error-500"
            },
            {
              title: "Error 503",
              route: "/page-error-503"
            }
          ]
        },
        {
          title: "Lock Screen",
          route: "/page-lock-screen"
        },
        {
          title: "Empty Page",
          route: "/admin/empty-page"
        }
      ]
    },
  ]
}
