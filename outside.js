var Outside = {
	testLocal: function (data) {
		"use strict";
		// TODO: Unimplemented until I can figure out how to access the current
		// website configuration data to match hostname.
		return false;
	},
	testTargeted: function (data) {
		"use strict";
		if (data.parsed.indexOf("target=") > -1) {
			return true;
		}
		return false;
	},
	// # Outsidify
	// If an anchor contains a reference to this site we should avoid it.
	// If an anchor already contains a target reference we should avoid it.
	// If an anchor is already html we should avoid it.
	//	**Already handled in core messaging parser.**
	// If none of the above cases are met, slap a target into the anchor and
	// callback that value.
	outsidify: function (raw, callback) {
		"use strict";
		var preparse = raw.parsed;
		if (Outside.testTargeted(raw) === false &&
			Outside.testLocal(raw) === false) {

			raw.parsed = raw.parsed.replace(/a href=/, 'a target="_new" href=');
			raw.parsedMessage = raw.parsedMessage.replace(preparse, raw.parsed);

		}
		return callback(null, raw);
	}

};

module.exports = Outside;
