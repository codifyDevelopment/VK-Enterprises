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
                $("#schamatic-to-pcb-track-related-field").show(); // Show the picture field
            } else {
                $("#schamatic-to-pcb-track-related-field").hide(); // Hide the picture field
            }
        });
        $("#schamatic-to-pcb-layer-related-body-input").on("change", function () {
            if (this.value === "yes") {
                $("#schamatic-to-pcb-layer-related-field").show(); // Show the picture field
            } else {
                $("#schamatic-to-pcb-layer-related-field").hide(); // Hide the picture field
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






