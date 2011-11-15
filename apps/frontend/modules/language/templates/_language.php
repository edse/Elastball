<form action="<?php echo url_for('change_language') ?>">
  <?php echo $form['language']->render() ?>
  <?php echo $form->renderHiddenFields() ?>
  <input type="submit" value="ok" />
</form>