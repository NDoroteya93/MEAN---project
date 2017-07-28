import { ResMedAppPage } from './app.po';

describe('res-med-app App', () => {
  let page: ResMedAppPage;

  beforeEach(() => {
    page = new ResMedAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
