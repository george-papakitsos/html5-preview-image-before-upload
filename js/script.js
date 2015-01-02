/**
 * HTML5 Preview Image Before Upload JS Module
 *
 * @author George Papakitsos <george@papakitsos.gr>
 * @copyright Copyright (c) 2014, George Papakitsos
 * @version 1.0
 */

var previewImageBeforeUploadModule = (function() {
	
	var options = null;
	
	var init = function(opt) {
		if (opt.previewClass === undefined)		opt.previewClass = "fileUploadPreview";
		if (opt.maxFiles === undefined)			opt.maxFiles = 1;
		if (opt.thumbnailWidth === undefined)	opt.thumbnailWidth = "auto";
		options = opt;
		
		$(options.inputSelector).css("display", "none");
		$(options.inputSelector).change(function() { preview(this); });
		$(options.clickableSelector).on("click", function() { $(options.inputSelector).trigger("click"); });
	};
	
	var preview = function(input) {
		var count = 0, reader = null;
		$(options.previewSelector).html("");
		$(input.files).each(function(i) {
			reader = new FileReader();
			reader.readAsDataURL(input.files[i]);
			reader.onload = function(e) {
				$(options.previewSelector).append('<div class="'+options.previewClass+'"><img src="" id="fileUploadModulePreview'+i+'" width="'+options.thumbnailWidth+'"></div>');
				$("#fileUploadModulePreview"+i).attr("src", e.target.result);
			};
			if (++count == options.maxFiles) return false;
		});
	};
	
	return {
		init: init
	};
	
})();

$(document).ready(function() {
	previewImageBeforeUploadModule.init({
		inputSelector: "#inputFile",
		clickableSelector: "#addImages",
		previewSelector: "#preview",
		previewClass: "fileUploadPreview",	// Default fileUploadPreview
		maxFiles: 4,						// Default 1
		thumbnailWidth: 150					// Default auto
	});
});