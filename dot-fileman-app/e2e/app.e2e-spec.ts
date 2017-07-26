import { DotFilemanAppPage } from './app.po';

describe('dot-fileman-app App', () => {
  let page: DotFilemanAppPage;

  beforeEach(() => {
    page = new DotFilemanAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
