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


        
        $("#mcpcb-led-package-input").on("change", function () {
            // console.log(this.val());
            if (this.value === "other led") {
                $("#mcpcb-led-package").after(`
                <div class="col other-led-package">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-package-1-input"
                        >LED Package 1
                        <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-led-package-1"
                            id="mcpcb-led-package-1-input"
                            required
                        />
                    </div>
                </div>
                <div class="col other-led-package">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-package-2-input"
                        >LED Package 2
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-led-package-2"
                            id="mcpcb-led-package-2-input"
                        />
                    </div>
                </div>
                `);
            } else $(".other-led-package").remove();
        });
        $("#mcpcb-connections-input").on("change", function () {
            $("#mcpcb-connections-details").remove();
            if (this.value === "SeriesXParallel") {
                return $("#mcpcb-connections").after(`
                    <div className="col" id="mcpcb-connections-details">
                        <label
                            for="mcpcb-SeriesXParallel-input"
                            class="form-label mb-2"
                        >
                            Series X Parallel
                            <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter SeriesXParallel Combination"
                                name="mcpcb-SeriesXParallel"
                                id="mcpcb-SeriesXParallel-input"
                                required
                            />
                        </div>
                    </div>
                `);
            }
            if (this.value === "SeriesXParallelXDrivers") {
                return $("#mcpcb-connections").after(`
                    <div className="col" id="mcpcb-connections-details">
                        <label
                            for="mcpcb-SeriesXParallelXDrivers-input"
                            class="form-label mb-2"
                        >
                            Series X Parallel X NO. Drivers
                            <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter SeriesXParallelXDrivers Combination"
                                name="mcpcb-SeriesXParallelXDrivers"
                                id="mcpcb-SeriesXParallelXDrivers-input"
                                required
                            />
                        </div>
                    </div>
                `);
            }
            if (this.value === "other combination") {
                return $("#mcpcb-connections").after(`
                    <div className="col" id="mcpcb-connections-details">
                        <label
                            for="mcpcb-other-connections-input"
                            class="form-label mb-2"
                        >
                            Any Spacial Connections
                            <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Other Connections"
                                name="mcpcb-other-connections"
                                id="mcpcb-other-connections-input"
                                required
                            />
                        </div>
                    </div>
                `);
            }
        });
        $("#mcpcb-led-placement-input").on("change", function () {
            if (this.value === "lens-file")
                return $("#mcpcb-led-placement").after(`
                <div class="col mcpcb-other-led-placement">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-placement-reference-2-input"
                        >LED Package
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-led-placement-reference-2"
                            id="mcpcb-led-placement-reference-2-input"
                        />
                    </div>
                </div>`);
            else $(".mcpcb-other-led-placement").remove();
        });
        $("#mcpcb-silk-layer-print-input").on("change", function () {
            if (this.value === "company-logo")
                return $("#mcpcb-silk-layer-print").after(`
                <div class="col">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-company-logo-input"
                        >Silk/Mask For Logo File
                        <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-company-logo"
                            id="mcpcb-company-logo-input"
                            required
                        />
                    </div>
                </div>
                `);
            else $("#mcpcb-company-logo-input").parent().parent().remove();
        });
        $("#mcpcb-more-related-attachments-input").on("change", function () {
            if (this.value === "yes")
                return $("#mcpcb-more-related-attachments").after(`
                <div class="col mcpcb-more-related-attachments-file">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-more-related-attachments-file-input-1"
                        >More Related Attachments File 1
                        <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-more-related-attachments-file-1"
                            id="mcpcb-more-related-attachments-file-input-1"
                            required
                        />
                    </div>
                </div>
                <div class="col mcpcb-more-related-attachments-file">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-more-related-attachments-file-input-2"
                        >More Related Attachments File 2
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-more-related-attachments-file-2"
                            id="mcpcb-more-related-attachments-file-input-2"
                        />
                    </div>
                </div>
                `);
            else $(".mcpcb-more-related-attachments-file").remove();
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

        $("#bomSwitch").on("change", function() {
            if ($(this).is(":checked")) {
                $("#bom-div").show();
            } else {
                $("#bom-div").hide();
            }
        });

        $("#mcpcb-sample-old-file-input").on("change", function () {
            if (this.value === "yes") {
                $("#mcpcb-sample-old-file-input-upload").show(); // Show the upload div
            } else {
                $("#mcpcb-sample-old-file-input-upload").hide(); // Hide the upload div
            }
        });
        $("#mcpcb-sample-body-input").on("change", function () {
            if (this.value === "yes") {
                $("#mcpcb-picture-field").show(); // Show the picture field
            } else {
                $("#mcpcb-picture-field").hide(); // Hide the picture field
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






