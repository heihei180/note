const routeLayout = require('./routerLayout');

const guideRoute = routeLayout("../guide")

    module.exports = {
    title: "Heihei's Blog",
    base: '/note/',
    description: "LIVE FOR LIVE",

    themeConfig: {
        editLink: {
            pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
        },

        nav: [{
                text: "Home",
                link: "/",
            }, {
                text: "Guide",
                link: "/guide/",
            }, {
                text: "External",
                link: "https://baidu.com",
            },
        ],
        sidebar: [
            '/', 
			{
                "title": "Guide",
                "children": guideRoute
            }, {
                "title": "面试",
                "children": routeLayout("../面试")
            }, {
                "title": "Python",
                "children": routeLayout("../Python")
            },
			{
                "title": "Java",
                "children": routeLayout("../Java")
            },
			{
                "title": "CPP",
                "children": routeLayout("../c++")
            },
			{
                "title": "toys",
                "children": routeLayout("../toys")
            }
			
        ]
    }
}
