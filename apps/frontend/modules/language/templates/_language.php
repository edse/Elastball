<form action="<?php echo url_for('change_language') ?>" id="langform">
  <?php echo $form['language']->render() ?>
  <?php echo $form->renderHiddenFields() ?>
  <input type="submit" value="ok" />
</form>