import '@testing-library/jest-dom';
import {render} from "@testing-library/react"
import App from "@/App";

/**
 * TODO : need jest config
 *     Here's what you can do:
 *      • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
 *      • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
 *      • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
 *      • If you need a custom transformation specify a "transform" option in your config.
 *      • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.
 *
 *     You'll find more details and examples of these config options in the docs:
 *     https://jestjs.io/docs/configuration
 *     For information about custom transformations, see:
 *     https://jestjs.io/docs/code-transformation
 */
describe('App', () => {
    it('should render', () => {
        expect(render(<App />)).toBeTruthy();
    });
});

