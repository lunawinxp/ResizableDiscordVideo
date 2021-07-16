/**
 * @name ResizableDiscordVideo
 * @version 1.0.0
 * @website https://github.com/lunalunaaaa/ResizableDiscordVideo
 * @source https://raw.githubusercontent.com/lunalunaaaa/ResizableDiscordVideo/main/ResizableDiscordVideo.plugin.js
 * @updateUrl https://raw.githubusercontent.com/lunalunaaaa/ResizableDiscordVideo/main/ResizableDiscordVideo.plugin.js
 */
/*@cc_on
@if (@_jscript)
@else@*/

module.exports = (() => {
	const config = {
		info: {
			name: "ResizableDiscordVideo",
			authors: [{
					name: "lunawinxp",
					github_username: "lunalunaaaa",
				}
			],
			version: "1.0.0",
			description: "Makes the Discord Picture-in-Picture window for video calls resizable.",
			github: "https://github.com/lunalunaaaa/ResizableDiscordVideo",
			github_raw: "https://raw.githubusercontent.com/lunalunaaaa/ResizableDiscordVideo/main/ResizableDiscordVideo.plugin.js"
		},
		defaultConfig: [{}, {}
		],
		main: "index.js"
	};

	return !global.ZeresPluginLibrary ? class{
		constructor() {
			this._config = config;
		}
		getName() {
			return config.info.name;
		}
		getAuthor() {
			return config.info.authors.map(a => a.name).join(", ");
		}
		getDescription() {
			return config.info.description;
		}
		getVersion() {
			return config.info.version;
		}
		load() {
			BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
				confirmText: "Download Now",
				cancelText: "Cancel",
				onConfirm: () => {
					require("request").get("https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js", async(error, response, body) => {
						if (error)
							return require("electron").shell.openExternal("https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
						await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
					});
				}
			});
		}
		start() {}
		stop() {}
	}
	 : (([Plugin, Api]) => {

		const plugin = (Plugin, Api) => {
			const{
				Patcher,
				WebpackModules,
				DiscordModules,
				PluginUtilities,
				Utilities
			} = Api;
			
			function doAddResize()
			{
				setTimeout(function () {
					try 
					{
						document.getElementsByClassName("pictureInPictureVideo-2iKsGg idle-70Gg3H")[0].style.resize = "both";
					} catch (er) {}
					doAddResize();
				}, 100);
			}
			
			return class StreamFixer extends Plugin{
				constructor() {
					super();
				}

				onStart() {
					setTimeout(function () {
						doAddResize()
					}, 100);
				}

				onStop() {}

				getSettingsPanel() {
					const panel = this.buildSettingsPanel();
					panel.addListener(() => {
						this.removeStyle();
						this.addStyle();
					});
					return panel.getElement();
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/