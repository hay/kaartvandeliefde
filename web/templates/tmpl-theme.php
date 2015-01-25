<div class="themepage theme_{{themeId}} container_page">
    <div class="contentHeader {{themeId}}" data-theme="{{themeId}}"></div>

    {{#each charts}}
        <div class="contentBlock">
            <div class="container_content">
                <div class="quote">{{text}}</div>
                <div class="chartcontainer" data-theme="{{../themeId}}" data-index="{{@index}}"></div>
            </div>
        </div>
    {{/each}}
</div>