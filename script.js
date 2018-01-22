$(document).ready(function () {
	var products = [{
		ProductID: 1,
		ProductName: "Chai",
		SupplierID: 1,
		CategoryID: 1,
		QuantityPerUnit: "10 boxes x 20 bags",
		UnitPrice: 18.0000,
		UnitsInStock: 39,
		ColorPalette: "#000000",
		ColorText: "#000000",
		UnitsOnOrder: 0,
		CategoryName: "Beverages",
		NewCategory: "Beverages",
		ReorderLevel: 10,
		Discontinued: false,
		Category: {
			CategoryID: 1,
			CategoryName: "Beverages",
			Description: "Soft drinks, coffees, teas, beers, and ales"
		},
		Color: "#00ff00",
		StatusEng: "Complete",
		StatusSpan: "Completar",
		StatusFR: "Compleatte`"
	}, {
		ProductID: 2,
		ProductName: "Chang",
		SupplierID: 1,
		CategoryName: "Beverages",
		CategoryID: 1,
		NewCategory: "Beverages",
		QuantityPerUnit: "24 - 12 oz bottles",
		UnitPrice: 19.0000,
		UnitsInStock: 17,
		UnitsOnOrder: 40,
		ReorderLevel: 25,
		Discontinued: false,
		ColorPalette: "#ffffff",
		ColorText: "#ffffff",
		Category: {
			CategoryID: 1,
			CategoryName: "Beverages",
			Description: "Soft drinks, coffees, teas, beers, and ales"
		},
		StatusEng: "Pending",
		StatusSpan: "Pendiente",
		StatusFR: "Pendienges`",
		Color: "#000000"
	}, {
		ProductID: 3,
		ProductName: "Aniseed Syrup",
		SupplierID: 1,
		CategoryID: 2,
		QuantityPerUnit: "12 - 550 ml bottles",
		UnitPrice: 10.0000,
		UnitsInStock: 13,
		CategoryName: "Condiments",
		NewCategory: "Condiments",
		UnitsOnOrder: 70,
		ReorderLevel: 25,
		Discontinued: false,
		Category: {
			CategoryID: 2,
			CategoryName: "Condiments",
			Description: "Sweet and savory sauces, relishes, spreads, and seasonings"
		},
		StatusEng: "Overdue",
		StatusSpan: "Atrasado",
		StatusFR: "OverdueFR",
		ColorPalette: "#ffffff",
		ColorText: "#ffffff",
	}];

	$("#grid").kendoGrid({
		dataSource: {
			data: products,
			schema: {
				model: {
					fields: {
						CategoryName: { type: "string", editable: true },
						IsActive: { editable: false },
						Color: { type: "color", editable: false }
					}
				}
			},
			pageSize: 20
		},

		dataBound: function () {
			$(".palette").kendoColorPicker({
				palette: 'basic'
			});
			$(".paletteText").kendoColorPicker({
				palette: ['#000000', '#ffffff'],
			});
			$("#palette").kendoColorPicker({
				palette: 'basic'
			});
			$("#paletteText").kendoColorPicker({
				palette: ["#000000", "#ffffff"],
			});
			$(".switch").kendoMobileSwitch({
			});
			$(".switch1").kendoMobileSwitch({
				onLabel: "MX",
				offLabel: "FR"
			});
		},
		
		height: 550,
		scrollable: { virtual: true },
		sortable: false,
		filterable: false,
		editable: true,
		columns: [
			{
				columns: [
					{
						field: "",
						title: "",
						
						columns: [{
							field: "",
							title: "",
							width: '50px',
							headerTemplate: function () {
								return "<button class='btn-link' onclick='addRow()'><span class='glyphicon glyphicon-plus-sign'></span></button>"
							}
						}],
					},


					{
						field: "CategoryName",
						title: "",
						
						columns: [{
							field: "CategoryName",
							title: "",
							headerTemplate: function () { return "<input type='text' id='engText' class='k-textbox'></input>" }
						}],

					},
					{
						field: "SourceSystemID", title: "Color",
						editable: false,
						columns: [{
							editable: false,
							headerTemplate: function (d) { return "<input type='color' data-role='colorpicker' value='#000000' data-palette=basic id='palette' />" },
							template: function (d) { return "<input type='color' data-role='colorpicker' value='" + d.ColorPalette + "' data-palette=basic class='palette paletteEdit' />" },
						}
						]
					},
					{
						field: "SourceSystem", title: "Text",
						editable: false,
						columns: [{
							editable: false,
							headerTemplate: function (d) { return "<input type='color' data-role='colorpicker' data-palette=['#000000','#ffffff'] id='paletteText' />" },
							template: function (d) { return "<input type='color' data-role='colorpicker' value='" + d.ColorText + "' data-palette=['#000000','#ffffff'] class='paletteText paletteEdit' />" },
						}
						]
					}],
				title: 'English'
			},
			{
				columns: [{
					field: "NewCategory",
					editable: false,
					columns: [

						{
							field: "NewCategory",
							title: "",
							editable: false,
							headerTemplate: function () { return '<input class="k-textbox" id="txtNewCategory"></input>' }
						}],
				},
				],
				hidden: false,
				title: "Spanish",
			},
			{		
				field: "IsActive",
				title: "",
				editable: function () { return false; },
				columns: [{ columns: [{ editable: false, template: function () { return "<input type='checkbox' data-role='switch' class='switch switchEdit' />" },}] }],
				headerTemplate: function () {
					return "<div style='text-align:left'><button type='button' data-role='button' onclick=LanguageSwitch('Spanish','StatusSpan') class='k-button buttonES'>ES</button> <button type='button' data-role='button' onclick=LanguageSwitch('French','StatusFR') class='k-button buttonFR'>FR</button></div>" }
			},
		]
	});

	$("#statuses-language-dropdown").kendoMenu({
		dataSource: [
			{
				text: "",
				items: [
					{ id: 1,text: "PR",  },
					{ id: 2,text: "Photo Galleries" },
					{ id: 3, text: "Videos Records" },
					{ id: 4, text: "Radio Records" }
				]
			},
			
		]
	});

	$("#grid tr").trigger('cssClassChanged');
	$("#grid tr").bind('cssClassChanged', function () {
		debugger;
	});
	$($("#grid tr td")[1]).on('change',function () {
		$($("#grid tr")[0]).removeClass('k-grid-edit-row')
	});
});

function addRow() {
	var grid = $("#grid").data("kendoGrid");
	grid.dataSource.insert(0, {
		CategoryName: $('#engText').val(), ColorPalette: $('#palette').data("kendoColorPicker").value(), ColorText: $('#paletteText').data("kendoColorPicker").value(),
		NewCategory: $('#txtNewCategory').val()
	});
	var options = grid.getOptions();
	grid.setOptions(options);
}

function LanguageSwitch(Language, ColumnName) {
	var grid = $("#grid").data("kendoGrid");
	var options = grid.getOptions();
	options.columns[1].title = Language;
	options.columns[1].columns[0].columns[0].field = ColumnName;
	grid.setOptions(options);
}



