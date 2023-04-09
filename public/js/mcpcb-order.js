const mcpcbNewOrderFormChangeHandler = async function () {
    await getNotification();
    // const mpcbbody = document.getElementById("mpcb-body");
    await (async function () {
        let pcbSize, pcbType;
        // let allServices = await fetchAllServices();
        // $("#pcb-type-input").html(
        //     `<option value="" disabled selected>Select an Option</option>`
        // );
        // allServices.forEach((service) => {
        //     $("#pcb-type-input").append(
        //         `<option value="${service.id}">${service.name}</option>`
        //     );
        // });
        // $("#pcb-type-input").on("change", function () {
        //     $("#pcb-type-title").html(
        //         `<h5 class="text-center text-secondary">
        //             You are filling ${$(
        //                 "#pcb-type-input option:selected"
        //             ).text()} order details
        //         </h5>`
        //     );
        // });
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
            if (this.value === "other")
                return $("#mcpcb-led-placement").after(`
                <div class="col mcpcb-other-led-placement">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-placement-reference-1-input"
                        >Other Reference File 1
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
                            name="mcpcb-led-placement-reference-1"
                            id="mcpcb-led-placement-reference-1-input"
                            required
                        />
                    </div>
                </div>
                <div class="col mcpcb-other-led-placement">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-placement-reference-2-input"
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
