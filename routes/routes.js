Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {name: 'boardSelection'});
Router.route('/board', {name: 'board'});
Router.route('/board/delete', {name: 'boardDelete'});