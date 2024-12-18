let url = new URL(window.location.href);

// Buttom Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0){
    // let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            
            if (status){    
                url.searchParams.set("status", status);
            }else{
                url.searchParams.delete("status");
            }

            window.location.href = url.href
        })
    })
}
// End Bottom Status

// From Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    // let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        
        if (keyword){
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        
        window.location.href = url.href;
    });
}
// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination.length > 0) {
    // let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;  
        });
    })
}
// EndPagination


// Check Box Multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
    const inputsId = checkBoxMulti.querySelectorAll("input[name='id']");
    
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked){
            inputsId.forEach((input) => {
                input.checked = true;
            });
        }else{
            inputsId.forEach((input) => {
                input.checked = false;
            })
        }
    });

    inputsId.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false; 
            }
        });
    });

}
// End Check Box Multi


// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const checkBoxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        
        const typeChange = e.target.elements.type.value;

        if (typeChange == "delete-all") {
            const isConfirm = confirm("bạn có chắc muốn xóa những sản phẩm này không");

            if (!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach((input) => {
                const id = input.value;

                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }else {
                    ids.push(id);
                }                
            });

            inputIds.value =  ids.join(", ");
            formChangeMulti.submit();
        }else {
            alert("Vui long chon it nhat mot ban ghi!!!");
        }
    }); 
}
// End Form Change Multi

// Show Alert

const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = document.querySelector("[close-alert]");
    
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}

// End Show Alert

// Upload Image

const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}

// End Upload Image

// slider

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-sidebar');
    const sider = document.querySelector('.sider');
    const overlay = createOverlay();
  
    // Hàm tạo lớp phủ (overlay)
    function createOverlay() {
      const overlayDiv = document.createElement('div');
      overlayDiv.classList.add('overlay');
      document.body.appendChild(overlayDiv);
  
      // Ẩn sidebar khi nhấp vào overlay
      overlayDiv.addEventListener('click', () => {
        toggleSidebar();
      });
  
      return overlayDiv;
    }
  
    // Hàm toggle sidebar
    function toggleSidebar() {
      sider.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
  
      // Lưu trạng thái sidebar vào localStorage
      const isActive = sider.classList.contains('active');
      localStorage.setItem('sidebarActive', isActive);
    }
  
    // Thêm sự kiện click cho nút toggle
    toggleButton.addEventListener('click', (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
      toggleSidebar();
    });
  
    // Đóng sidebar khi thay đổi kích thước cửa sổ lên màn hình lớn hơn
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        sider.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  
    // Khởi tạo trạng thái sidebar từ localStorage
    if (localStorage.getItem('sidebarActive') === 'true') {
      sider.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  
    // Đóng sidebar khi nhấn phím Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sider.classList.contains('active')) {
        toggleSidebar();
      }
    });
  });
  
