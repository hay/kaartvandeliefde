<div class="themepage theme_{{themeId}} container_page">
    <div class="contentHeader {{themeId}}" data-theme="{{themeId}}">
        <div class="container_scrollDown">
                <span>Scroll verder voor meer informatie!</span>
                <div class="arrow_down"></div>
        </div>
    </div>

    {{#each charts}}
        <div class="contentBlock">
            <div class="container_content">
                <div class="quote"></div>
                <div class="chartcontainer" data-theme="{{../themeId}}" data-index="{{@index}}"></div>
            </div>
            {{#if @last}}
                <div class="container_scrollUp">
                        <div class="arrow_up"></div>
                        <span>Terug naar de kaart</span>
                </div>
            {{/if}}
        </div>
    {{/each}}
</div>