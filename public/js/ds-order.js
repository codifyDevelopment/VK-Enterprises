const dsNewOrderFormChangeHandler = async function () {
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

        // double-layer-form
        $("#double-layer-form-switch").on("change", function () {
            if ($(this).is(":checked")) {
                $("#double-layer-form").show();
            } else {
                $("#double-layer-form").hide();
            }
        });
        $("#double-layer-text").hide();
        $("#double-layer-form-text").on("change", function() {
        if ($(this).val() === "yes") {
            $("#double-layer-text").show();
        } else {
            $("#double-layer-text").hide();
        }
        });

        // double-layer-CAMPanelizationswitch
        $("#double-layer-CAMPanelizationswitch").on("change", function () {
            if ($(this).is(":checked")) {
                $("#double-layer-cam-panellization-div").show();
            } else {
                $("#double-layer-cam-panellization-div").hide();
            }
        });

        // bom-switch
        $("#double-layer-bomSwitch").on("change", function () {
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

        $("#ds-old-pcb-file-input").on("change", function () {
            if (this.value === "yes") {
                $("#ds-sample-old-file-input-upload").show(); // Show the upload div
            } else {
                $("#ds-sample-old-file-input-upload").hide(); // Hide the upload div
            }
        });
        $("#ds-sample-body-input").on("change", function () {
            if (this.value === "yes") {
                $("#ds-picture-field").show(); // Show the picture field
            } else {
                $("#ds-picture-field").hide(); // Hide the picture field
            }
        });
        $("#ds-copper-track-designing-input").on("change", function () {
            if (this.value === "client-request") {
                $(".ss-copper-track-designing-filed").show(); // Show the picture field
            } else {
                $(".ss-copper-track-designing-filed").hide(); // Hide the picture field
            }
        });
        $("#ds-silk-legend-layer-input").on("change", function () {
            if (this.value === "require") {
                $(".ds-silk-legend-layer-field").show(); // Show the picture field
            } else {
                $(".ds-silk-legend-layer-field").hide(); // Hide the picture field
            }
        });

        $("#ds-bottom-silk-legend-layer-input").on("change", function () {
            if (this.value === "require") {
                $(".ds-bottom-silk-legend-field").show(); // Show the picture field
            } else {
                $(".ds-bottom-silk-legend-field").hide(); // Hide the picture field
            }
        });
        $("#ds-any-design-relating-input").on("change", function () {
            if (this.value === "yes") {
                $(".ds-any-design-relating-field").show(); // Show the picture field
            } else {
                $(".ds-any-design-relating-field").hide(); // Hide the picture field
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






