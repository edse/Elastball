<td>
  <ul class="sf_admin_td_actions">
    <?php if($socket->getStatus() != "open"): ?>
    <li class="sf_admin_action_open">
      <?php echo link_to(__('Open', array(), 'messages'), 'socket/ListOpen?id='.$socket->getId(), array()) ?>
    </li>
    <?php else: ?>
    <li class="sf_admin_action_close">
      <?php echo link_to(__('Close', array(), 'messages'), 'socket/ListClose?id='.$socket->getId(), array()) ?>
    </li>
    <?php endif; ?>
    <li class="sf_admin_action_dashboard">
      <?php echo link_to(__('Dashboard', array(), 'messages'), 'socket/ListDashboard?id='.$socket->getId(), array()) ?>
    </li>
    <?php echo $helper->linkToEdit($socket, array(  'params' =>   array(  ),  'class_suffix' => 'edit',  'label' => 'Edit',)) ?>
    <?php echo $helper->linkToDelete($socket, array(  'params' =>   array(  ),  'confirm' => 'Are you sure?',  'class_suffix' => 'delete',  'label' => 'Delete',)) ?>
  </ul>
</td>
