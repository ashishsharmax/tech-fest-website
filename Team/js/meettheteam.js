function biograph(e) {
	if(e.className == 'about__slot') {
		var x = document.getElementsByClassName("about__slot bio");
		var i;
		for(i=0;i<x.length;i++)
		{
			x[i].className="about__slot";
		}
		e.className = 'about__slot bio';
	}
	else {
		e.className = 'about__slot';
	}
}
