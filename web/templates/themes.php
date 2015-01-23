<?php foreach (Data::$themes as $themeId => $theme): ?>
<div class="themepage theme_<?= $themeId; ?> container_page" data-theme="<?= $themeId; ?>">
    <div class="contentHeader <?= $themeId; ?>" data-category="<?= $theme['category']; ?>">
        <div class="container_content">
            <h1><?= $theme['title']; ?></h1>
        </div>
    </div>

    <?php foreach ($theme['charts'] as $chart) : ?>
    <div class="contentBlock"
         data-category="<?= $chart['category'] ?>"
     >
        <div class="container_content">
            <span class="singleQuote">
                <?php printf($chart['single'], '<span class="gemeente_name1"></span>'); ?>
            </span>

            <span class="doubleQuote">
                <?php printf(
                    $chart['double'],
                    '<span class="gemeente_name1"></span>',
                    '<span class="gemeente_name2"></span>'
                ); ?>
            </span>

            <div class="chartcontainer">
                <table class="chart_table">
                    <tr>
                        <td class = "chart_left">
                            <div class="chart_gemeenteName"></div>
                            <div class="chart_chart"></div>
                        </td>
                        <td class = "chart_right">
                            <div class="chart_gemeenteName"></div>
                            <div class="chart_chart"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>
<?php endforeach; ?>