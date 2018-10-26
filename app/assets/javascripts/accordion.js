function accordion () {
  function showPanel (e) {
    $(e).toggleClass('step-is-shown')
    $(e).find('.js-panel').toggleClass('js-hidden')
    $(e).find('.js-toggle-link').html(function () {
      if ($(e).find('.js-toggle-link').text() === 'show') {
        $(e).find('.js-toggle-link').html('hide')
      } else {
        $(e).find('.js-toggle-link').html('show')
      }
    })
  }

  $('.gem-c-step-nav__step').click(function () {
    showPanel($(this))
  })

  $('.gem-c-step-nav__controls').click(function () {
    // todo - fix show all and hide all features. Very crude for now
    $('.gem-c-step-nav__steps > li').each(function (index) {
      showPanel($('.gem-c-step-nav__steps > li:nth-child(' + index + ')'))
    })
    $(this).find('button').html(function () {
      console.log($(this).text())
      if ($(this).text() === 'Show all') {
        $(this).html('Hide all')
      } else {
        $(this).html('Show all')
      }
    })
  })
}

accordion()
