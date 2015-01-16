<div id="filters" class="container_filters">
    <ul class="container_dropdowns">
        <?php foreach (Data::$filters as $filter) : ?>
            <li class="dropdown">
                <a class="dropdown_button">
                    <?= $filter['name']; ?>
                    <span class="caret"></span>
                </a>

                <ul class="dropdown_menu">
                    <?php foreach ($filter['values'] as $index => $value) : ?>
                        <li>
                            <a class="dropdown_menuButton"
                               data-name="<?= $filter['id']; ?>"
                               data-value="<?= $index; ?>">
                               <?= $value; ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>
</div>