import { StoryLabPage } from './app.po';

describe('story-lab App', () => {
  let page: StoryLabPage;

  beforeEach(() => {
    page = new StoryLabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
