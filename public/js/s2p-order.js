const s2pNewOrderFormChangeHandler = async function () {
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

        // stop-layer-form
        $("#stop-layer-form-switch").on("change", function () {
            if ($(this).is(":checked")) {
                $("#stop-layer-form").show();
            } else {
                $("#stop-layer-form").hide();
            }
        });
        $("#stop-layer-text").hide();
        $("#stop-layer-form-text").on("change", function() {
        if ($(this).val() === "yes") {
            $("#stop-layer-text").show();
        } else {
            $("#stop-layer-text").hide();
        }
        });

        // stop-layer-CAMPanelizationswitch
        $("#stop-layer-CAMPanelizationswitch").on("change", function () {
            if ($(this).is(":checked")) {
                $("#stop-layer-cam-panellization-div").show();
            } else {
                $("#stop-layer-cam-panellization-div").hide();
            }
        });

        // bom-switch
        $("#stop-layer-bomSwitch").on("change", function () {
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
        $("#schamatic-to-pcb-layer-sample-old-file-input").on("change", function () {
            if (this.value === "yes") {
                $("#schamatic-to-pcb-layer-sample-old-file-input-upload").show(); // Show the upload div
            } else {
                $("#schamatic-to-pcb-layer-sample-old-file-input-upload").hide(); // Hide the upload div
            }
        });
        $("#Schamatic-to-PCB-layer-sample-body-input").on("change", function () {
            if (this.value === "yes") {
                $("#Schamatic-to-PCB-layer-picture-field").show(); // Show the picture field
            } else {
                $("#Schamatic-to-PCB-layer-picture-field").hide(); // Hide the picture field
            }
        });
        $("#schamatic-to-pcb-track-related-body-input").on("change", function () {
            if (this.value === "yes") {
                $(".select-1").show(); // Show the picture field
            } else {
                $(".select-1").hide(); // Hide the picture field
            }
        });
        $("#schamatic-to-pcb-layer-related-body-input").on("change", function () {
            if (this.value === "yes") {
                $(".select-2").show(); // Show the picture field
            } else {
                $(".select-2").hide(); // Hide the picture field
            }
        });
        $("#schamatic-to-type-layer-related-body-input").on("change", function () {
            if (this.value === "yes") {
                $(".select-3").show(); // Show the picture field
            } else {
                $(".select-3").hide(); // Hide the picture field
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






