const routeLayout = require('./routerLayout-test');


const guideRoute = routeLayout("../guide")

module.exports = {
    title: 'Hello VuePress',
	base: './',
    description: 'Just playing around',

    themeConfig: {
        sidebar: [
            '/',
            {
                "title": "Guide",
                "children": guideRoute
            },
            {
                "title": "面试",
                "children": routeLayout("../面试")
            },
            {
                "title": "Python",
                "children": routeLayout("../Python")
            }
        ]
    }
}