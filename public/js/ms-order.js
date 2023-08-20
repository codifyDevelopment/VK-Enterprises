const mcpcbNewOrderFormChangeHandler = async function () {
    await getNotification();
    // const mpcbbody = document.getElementById("mpcb-body");
    await (async function () {
        let pcbSize, pcbType;
        $("input[name=pcb-size]").on("change", function () {
            if (this.value === "known")
                $("#pcb-size").after(`
                <div
                    class="col col-md-12"
                    id="pcb-size-known-inputs"
                >
                    <div class="row row-cols-1 row-cols-md-2 g-3">
                        <div class="col">
                            <label
                                class="form-label mb-2"
                                for="pcb-x-dimension-input"
                                >X Dimension
                                <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="X Dimension in mm"
                                    name="pcb-x-dimension"
                                    id="pcb-x-dimension-input"
                                    required
                                />
                            </div>
                        </div>
                        <div class="col">
                            <label
                                class="form-label mb-2"
                                for="pcb-y-dimension-input"
                                >Y Dimension
                                <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Y Dimension in mm"
                                    name="pcb-y-dimension"
                                    id="pcb-y-dimension-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>`);
            else $("#pcb-size-known-inputs").remove();
        });

        // stencile-form
        $("#StencileFormswitch").on("change", function() {
            if ($(this).is(":checked")) {
              $("#stencile-form").show(); // Show the content
            } else {
              $("#stencile-form").hide(); // Hide the content
            }
        });

        $("#CAMPanelizationswitch").on("change", function (){
            if ($(this).is(":checked")) {
                $("#cam-panellization-div").show(); // Show the content
              } else {
                $("#cam-panellization-div").hide(); // Hide the content
              }
        });

        $("#ms-sample-old-file-input").on("change", function () {
            if (this.value === "yes") {
                $("#ms-sample-old-file-input-upload").show(); // Show the upload div
            } else {
                $("#ms-sample-old-file-input-upload").hide(); // Hide the upload div
            }
        });
        $("#ms-sample-body-input").on("change", function () {
            if (this.value === "yes") {
                $("#ms-picture-field").show(); // Show the picture field
            } else {
                $("#ms-picture-field").hide(); // Hide the picture field
            }
        });
        $("#ms-copper-track-designing-input").on("change", function () {
            if (this.value === "client-request") {
                $("#ms-copper-track-designing-filed").show(); // Show the picture field
            } else {
                $("#ms-copper-track-designing-filed").hide(); // Hide the picture field
            }
        });
        $("#ms-silk-legend-layer-input").on("change", function () {
            if (this.value === "require") {
                $("#ms-silk-legend-layer-field").show(); // Show the picture field
            } else {
                $("#ms-silk-legend-layer-field").hide(); // Hide the picture field
            }
        });

        $("#ms-bottom-silklegend-layer-input").on("change", function () {
            if (this.value === "require") {
                $("#ms-bottom-silklegend-layer-field").show(); // Show the picture field
            } else {
                $("#ms-bottom-silklegend-layer-field").hide(); // Hide the picture field
            }
        });

        // multi-layer-form
        $("#multi-layer-form-switch").on("change", function () {
            if ($(this).is(":checked")) {
                $("#multi-layer-form").show();
            } else {
                $("#multi-layer-form").hide();
            }
        });
        $("#multi-layer-text").hide();
        $("#multi-layer-form-text").on("change", function() {
        if ($(this).val() === "yes") {
            $("#multi-layer-text").show();
        } else {
            $("#multi-layer-text").hide();
        }
        });

        // multi-layer-CAMPanelizationswitch
        $("#multi-layer-CAMPanelizationswitch").on("change", function () {
            if ($(this).is(":checked")) {
                $("#multi-layer-cam-panellization-div").show();
            } else {
                $("#multi-layer-cam-panellization-div").hide();
            }
        });

        // bom-switch
        $("#multi-layer-bomSwitch").on("change", function () {
            if ($(this).is(":checked")) {
                $("#bom-div").show();
            } else {
                $("#bom-div").hide();
            }
        });
        $("#bom-text-div").hide();
        $("#relatedTextOption-bom").on("change", function() {
            if ($(this).val() === "yes") {
                $("#bom-text-div").show();
            } else {
                $("#bom-text-div").hide();
            }
        });



        // if (new URLSearchParams(window.location.search).get("pcb-type")) {
        //     pcbType = new URLSearchParams(window.location.search).get(
        //         "pcb-type"
        //     );
        //     $("#pcb-type-input")
        //         .val(pcbType)
        //         .trigger("change")
        //         .attr("disabled", true);
        // }

        $("#pcb-size-known").attr("checked", true).trigger("change");
    })();
};


//this is for directing payment page 
document.getElementById("placeOrderButton").addEventListener("click", function() {
    window.location.href = "/payment"; // Redirect to the /payment route
});




// this is for accept tearm and condition 
const acceptTermsLabel = document.getElementById("acceptTermsLabel");
const placeOrderButton = document.getElementById("placeOrderButton");

let termsAccepted = false;

acceptTermsLabel.addEventListener("click", () => {
    termsAccepted = !termsAccepted;

    if (termsAccepted) {
        acceptTermsLabel.classList.add("active");
        placeOrderButton.removeAttribute("disabled");
    } else {
        acceptTermsLabel.classList.remove("active");
        placeOrderButton.setAttribute("disabled", "true");
    }
});






