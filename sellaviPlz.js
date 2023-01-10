class SellaviPlz {
    constructor(props = {}) {
        this.shopNumber = props.shopNumber;
        this.shopCountry = props.shopCountry;
        this.shopMainColor = props.shopMainColor;

        //ELEMENTS CONTACTS
        this.telNumElem = document.querySelector('.widget-categories a[href^="tel"]');
        this.mailElem = document.querySelector('.widget-categories a[href^="mailto"]');
        this.whatsappElem = document.querySelector('.whatsapp-button a');

        //ELEMENTS IN HEADER
        this.headerContainerElem = document.querySelector('.header-wrapper .container-fluid, .header-wrapper .container');
        this.headerLogoElem = document.querySelector('.header .logo');
        this.mobileNavElem = document.querySelector('.mobile_side_nav_menu');
        this.headerCartElem = document.querySelector('.header-cart');
        this.headerCartIconElem = document.querySelector('.header-cart .cart_drop_down > a > i')
        this.headerWrapperElem = document.querySelector('.header-wrapper');
        this.desktopNavElem = document.querySelector('.navigation-wrapper');
        this.mobileSideNavWrapperElem = document.querySelector('.navigation.mobile_side_nav');
        this.headerSearchElem = document.querySelector('.header-search');
        this.headerSearchInputElem = document.querySelector('.header-search .form-control');
        this.headerSearchBtnElem = document.querySelector('#search button');
    
        //ELEMENTS IN COMMON-HOME
        this.categoriesContainerElem = document.querySelector('.homefeatured_category .container');
        this.mainSliderElem = document.querySelector("#home.common-home .main-slider");
        this.contentAreaElem = document.querySelector("#home.common-home .content-area");

        //ELEMENTS IN FOOTER
        this.footerContainerElem = document.querySelector('.footer-widgets .container');
        this.footerSellaviLogoElem = document.querySelector('#sellavi_logo');
        this.footerCol1Elem = document.querySelector('.footer-widgets .row>div:first-child ul');
        this.footerCol2Elem = document.querySelector('.footer-widgets .row>div:nth-child(2) ul');
        this.footerCol3Elem = document.querySelector('.footer-widgets .row>div:last-child ul');
        this.footerPaymentsElem = document.querySelector('.footer .copyright_row');

        //SHOP VARIABLES
        this.telNum = this.telNumElem ? this.telNumElem.textContent : '';
        this.mail = this.mailElem ? this.mailElem.textContent : '';
        this.whatsapp = this.whatsappElem ? this.whatsappElem.getAttribute('href') : '';

        //HTML TEMPLATES

        //Здесь нужно тайтлы для Болгарии / других стран сделать.
        this.headerLoginHTML = (headerLoginInnerHTML) => `
            <div class="header_login">
                <a class="d-none d-lg-block" href="/login/" title="Авторизация"> 
                    ${headerLoginInnerHTML}
                </a>
            </div>
        `;
        this.headerWishlistHTML = (headerWishlistInnerHTML) => `
            <div class="header-wishlist">
                <a class="header-wishlist__link" href="/index.php?route=account/wishlist" title="Список закладок">
                    ${headerWishlistInnerHTML}
                </a>
            </div>
        `;
        this.headerSearchBtnHTML = (headerSearchBtnInnerHTML) => `
            <button class="search-activator">
                ${headerSearchBtnInnerHTML}
            </button>
        `;

        //URLS
        this.footerPaymentsURL = `https://sellavi-russia-dev.github.io/${this.shopNumber}/images/payments.png`;
        this.footerSellaviLogoURL = `https://sellavi-russia-dev.github.io/${this.shopNumber}/images/sellavi-logo.svg`;

        //ADD HEADER ELEMENTS
        this.newHeaderLoginBtn = props.headerLoginBtn;
        this.newHeaderWishlistBtn = props.headerWishlistBtn;
        this.newHeaderSearchBtn = props.headerSearchBtn;
        this.newCartIcon = props.headerCartBtn;

        //DIFFERENT PARAMS
        this.hideCounterOnZero = props.hideCounterOnZero;
        this.hideUnnecessaryLinks = props.hideUnnecessaryLinks;
        this.navInHeader = props.navInHeader;
        this.sellaviLogoChanged = props.sellaviLogoChanged;
        this.paymentsAdded = props.paymentsAdded;

        //START INIT FUNCTION

        this.go();
    }

    activateSearchOnBtnClick() {
        try {
            const removeSearchActive = (e) => {
                if (e.target.closest('.header-search, .search-activator, span, i, .icon-search')) return;
    
                if (this.headerSearchElem.classList.contains('visible')) {
                    this.headerSearchElem.classList.remove('visible')
                    document.removeEventListener('click', removeSearchActive);
                }
            };

            const toggleSearch = (e) => {
                if (e.target.closest('.search-activator')) {
                    this.headerSearchElem.classList.toggle('visible');
                    this.headerSearchInputElem.click();
    
                    document.addEventListener('click', removeSearchActive);
                }
            };
    
            document.body.addEventListener('click', toggleSearch);
        } catch(e) {console.error(e)}
    }

    addFooterPayments(url = this.footerPaymentsURL) {
        try {
            this.footerPaymentsElem.insertAdjacentHTML('beforeend', `
                <div class="col-sm-6">
                    <div class="payments">
                        <div>
                            <img src="${url}" class="img-fluid" alt=""/>
                        </div>
                    </div>
                </div>
            `);
        } catch (e) {console.error(e)}
    }

    addHeaderElement(html) {
        try {
            this.headerLogoElem.insertAdjacentHTML('afterend', html)
        } catch (e) {console.error(e)}
    }

    addNavInHeader() {
        this.headerContainerElem.insertAdjacentElement('beforeend', this.desktopNavElem);
    }

    addSearchBtnEffect() {
        try {
            const topBarSearch = document.querySelector('.top-bar .icon-search');
            const blackScreen = document.querySelector('.search_black_screen');
            const searchClose = document.querySelector('.search_close');
    
            headerSearchBtn.addEventListener('click', () => {
                const searchText = this.headerSearchInputElem.value.trim();
    
                    if (searchText) window.open(`/search/?search=${searchText}&description=true`, '_self')
                    else {
                        this.headerSearchInputElem.click()
                        if (!this.headerSearchElem.classList.contains('opened')) this.headerSearchElem.classList.add('opened')
                    }
            });
    
            if (document.querySelector('.product-search')) {
                try {
                    this.headerSearchInputElem.value = '';
                } catch {}
            }
    
            this.headerSearchInputElem.addEventListener('focus', () => {
                if (window.matchMedia('(max-width:991px)').matches && topBarSearch) {
                    topBarSearch.click();
                }
            });
    
            searchClose.addEventListener('click', () => blackScreen.click())
        } catch (e) { console.error(e) }
    }

    changeCartBtnIcon(svg) {
        try {
            this.headerCartIconElem.outerHTML = svg;
        } catch (e) {console.error(e)}
    }

    changeSellaviLogo(url = this.footerSellaviLogoURL) {
        try {
            this.footerSellaviLogoElem.innerHTML = `<img data-src="${url}" alt="" class="img-fluid" src="${url}">`;
        } catch (e) {console.error(e)}
    }

    fixSideMenu() {
        try {
            this.headerWrapperElem.insertAdjacentElement('beforeend', this.mobileSideNavWrapperElem);
        } catch (e) {console.error(e)}
    }

    fixDesktopNav() {
        const navEmptyItem = document.querySelectorAll('.empty-item');
        navEmptyItem.forEach(item => item.remove());
    }

    hideEmptyProductCounter() {
        if (document.querySelector('#cart .cart-qty-circle')) {
            const mainCircle = document.querySelector('#cart .cart-qty-circle');
            const quantityCircles = document.querySelectorAll('.cart-qty-circle');

            const hideQuantityCircles = () => quantityCircles.forEach(item => item.style.cssText = 'display: none !important;')
            const showQuantityCircles = () => quantityCircles.forEach(item => item.style.cssText = '');

            const checkQuantity = () => {
                const quantity = mainCircle.textContent.trim();
                console.log(quantity);

                if (quantity === '0') hideQuantityCircles()
                else showQuantityCircles();
            }

            const config = {childList: true};
            const quantityObserver = new MutationObserver(checkQuantity);
            quantityObserver.observe(mainCircle, config);
            checkQuantity();
        }        
    }

    removeStepWordsOnCheckout() {
        if (document.querySelector('#home.checkout-checkout')) {
            document.querySelectorAll('h2').forEach(h2 => h2.textContent = h2.textContent.trim().slice(6));
        }
    }

    removeUnnecessaryLinks() {
        try {
            const xpathNews = "//legend[text()='Рассылка новостей']";
            const xpathEmail = "//a[text()='E-Mail рассылка']";
            const xpathFiles = "//a[text()='Файлы для скачивания']";
            const newsElem = document.evaluate(xpathNews, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            const emailElem = document.evaluate(xpathEmail, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            const filesElem = document.evaluate(xpathFiles, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    
            if (newsElem) newsElem.closest('fieldset').style.display = 'none';
            if (emailElem) emailElem.closest('li').style.display = 'none';
            if (filesElem) filesElem.closest('li').style.display = 'none';


            const blockTitles = document.querySelectorAll('.block-title.alt');
            const blockDetails = document.querySelectorAll('.details-box');
            const accountDetails = document.querySelectorAll('.widget.account-details li');

            if (blockTitles) blockTitles.forEach(elem => {
                if (elem.textContent.trim() === 'Подписка') elem.remove();
            })
            if (blockDetails) blockDetails.forEach(elem => {
                if (elem.textContent.trim() === 'Подписаться или отказаться от рассылки новостей') elem.remove();
                if (elem.textContent.trim() === 'Файлы для скачивания') elem.remove();
            });
            if (accountDetails) accountDetails.forEach(item => {
                if (item.textContent.trim() === 'Файлы для скачивания') item.remove();
            })

            this.footerCol3Elem.querySelectorAll('li').forEach(item => {
                if (item.textContent === 'Рассылка') item.remove();
            });
        } catch (e) { console.error(e) }
    }

    renameStepNamesCartCheckout() {
        if (document.querySelectorAll('.step-name')) {
            document.querySelectorAll('.step-name').forEach(elem => {
                if (elem.textContent.toLowerCase().includes('корзина')) elem.textContent = 'Корзина';
                if (elem.textContent.toLowerCase().includes('касса')) elem.textContent = 'Оформление';
            })
        }
    }

    renameCheckoutCommentLabel() {
        try {
            const checkoutLabelComments = document.querySelector('#home.checkout-checkout .seller-comments label');
    
            checkoutLabelComments.textContent = 'Комментарий к заказу';
        } catch (e) { console.error(e) }
    }

    renameInformationTitleInAccount() {
        try {
            const accountTitles = document.querySelectorAll('#home .widget.account-details .widget-title');
    
            if (accountTitles) accountTitles.forEach(elem => {
                if (elem.textContent.trim() === 'Изменить контактную информацию') {
                    elem.textContent = 'Информация';
                }
            })
        } catch (e) { console.error(e) }
    }

    renameAddToCartBtnsInWishlist() {
        try {
            document.querySelectorAll('#home.account-wishlist .add_to_cart button').forEach(btn => {
                if (btn.textContent.toLowerCase().includes('cart')) btn.textContent = 'Купить';
            });
        } catch (e) { console.error(e) }
    }

    renameFilterBtn() {
        try {
            const btn = document.querySelector('.filter_price_button');
    
            if (btn.textContent.toLowerCase().includes('filter')) btn.textContent = 'Применить фильтр';
        } catch (e) {console.error(e)}
    }

    renameTextInCaptchaPlaceholder() {
        if(document.querySelector('.information-contact')) {  
            try {
                const catpchaLabel = document.querySelector('label[for="input-captcha"]');
                const captchaInput = document.getElementById('input-captcha');
                  
                catpchaLabel.classList.add('d-none');
                captchaInput.placeholder = 'Введите код в это поле';
              } catch (e) {console.log(e)}
        }
    }

    //INIT

    go() {
        //WORK ON HEADER
        if (this.newHeaderSearchBtn) {
            this.addHeaderElement(this.headerSearchBtnHTML(this.newHeaderSearchBtn));
            this.activateSearchOnBtnClick();
        }
        if (this.newHeaderLoginBtn) this.addHeaderElement(this.headerLoginHTML(this.newHeaderLoginBtn));
        if (this.newHeaderWishlistBtn) this.addHeaderElement(this.headerWishlistHTML(this.newHeaderWishlistBtn));
        if (this.newCartIcon) this.changeCartBtnIcon(this.newCartIcon);
        if (this.hideCounterOnZero) this.hideEmptyProductCounter();
        if (this.navInHeader) this.addNavInHeader();
        if (this.sellaviLogoChanged) this.changeSellaviLogo();
        if (this.paymentsAdded) this.addFooterPayments();

        this.fixSideMenu();
        this.fixDesktopNav();
        this.addSearchBtnEffect();

        //FIXES ON DIFFERENT LANGUAGES
        if (this.shopCountry === 'RU') {
            this.removeStepWordsOnCheckout();
            this.renameStepNamesCartCheckout();
            this.renameCheckoutCommentLabel();
            this.renameInformationTitleInAccount();
            this.renameAddToCartBtnsInWishlist();
            this.renameFilterBtn();
            this.renameTextInCaptchaPlaceholder();

            if(this.hideUnnecessaryLinks) removeUnnecessaryLinks()
        }
    }
}

window.SellaviPlz = SellaviPlz;

// const doMagic = new SellaviPlz({
//     shopNumber: '111111',
//     shopCountry: 'RU',
//     shopMainColor: '#000',
//     headerLoginBtn: 'svg',
//     headerWishlistBtn: 'svg',
//     headerSearchBtn: 'svg',
//     headerCartBtn: 'svg',
//     navInHeader: true,
//     hideCounterOnZero: true,
//     hideUnnecessaryLinks: true,
//     sellaviLogoChanged: true,
//     paymentsAdded: true,
// })