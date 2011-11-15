<!DOCTYPE html>
<html>
    <head>
    <?php include_http_metas() ?>
    <?php include_metas() ?>
    <?php include_title() ?>
    <link rel="shortcut icon" href="/favicon.ico" />
    <?php include_stylesheets() ?>
    <?php include_javascripts() ?>
  </head>
  <body>
    <?php if($sf_user->isAuthenticated()): ?>
      <?php include_partial('global/menu') ?>
    <?php endif; ?>
    <?php echo $sf_content ?>
    <?php include_partial('global/footer') ?>
  </body>
</html>