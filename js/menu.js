var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
        showLeft = document.getElementById( 'showLeft' ),
        hide = document.getElementById( 'hide' ),
       
        body = document.body;

      showLeft.onclick = function() {
        classie.toggle( this, 'active' );
        classie.toggle( menuLeft, 'cbp-spmenu-open' );
        disableOther( 'showLeft' );
      };
      hide.onclick = function() {
        classie.toggle( this, 'active' );
        classie.toggle( menuLeft, 'cbp-spmenu-open' );
        disableOther( 'showLeft' );
      };
      
      function disableOther( button ) {
        if( button !== 'showLeft' ) {
          classie.toggle( showLeft, 'disabled' );
        }
        if( button !== 'showRight' ) {
          classie.toggle( showRight, 'disabled' );
        }
        if( button !== 'showTop' ) {
          classie.toggle( showTop, 'disabled' );
        }
        if( button !== 'showBottom' ) {
          classie.toggle( showBottom, 'disabled' );
        }
        if( button !== 'showLeftPush' ) {
          classie.toggle( showLeftPush, 'disabled' );
        }
        if( button !== 'showRightPush' ) {
          classie.toggle( showRightPush, 'disabled' );
        }
      }

      $(document).ready(function() {

$('body').css('display', 'none');

$('body').fadeIn(1000);



$('.link').click(function() {

event.preventDefault();

newLocation = this.href;

$('body').fadeOut(1000, newpage);

});

function newpage() {

window.location = newLocation;

}

});

