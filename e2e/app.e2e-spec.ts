import { MixxxwizardngPage } from './app.po';

describe('mixxxwizardng App', () => {
  let page: MixxxwizardngPage;

  beforeEach(() => {
    page = new MixxxwizardngPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
