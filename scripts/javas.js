var data = null;
var key = null;
function submitForm() {
    var ip = document.getElementById("ipInput").value;
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;

    if (ip.trim() === '' || username.trim() === '' || password.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    var loader = document.getElementById("loader-wrapper");
    loader.style.display = "flex"; 

    var myJSONObject = {
        'ip': ip,
        'username': username,
        'password': password
    };

    fetch("http://localhost:5000/set-connection", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myJSONObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud:', response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta del servidor:", data);
        setTimeout(function() {
            window.location.href = "main.html"; // Redirige después de 5 segundos
        }, 2000);
    })
    .catch(error => {
        console.error("Error en la solicitud:", error.message);
        loader.style.display = "none";
    });
}
function dimeNodo(nodo){
    data=nodo.data;
    key=data.key;
}

function limpiarFormulario() {
    document.getElementById("routerConfigForm").reset();
    document.getElementById("vlanFields").style.display = "none";
    document.getElementById("natFields").style.display = "none";
    document.getElementById("dhcpFields").style.display = "none";
    document.getElementById("dhcpv6Fields-se").style.display = "none";
    document.getElementById("dhcpv6Fields").style.display = "none";
}

function applyAllConfigurations() {
    var hostname = document.getElementById("hostnameInput").value.trim();
    var ipDomainName = document.getElementById("ipDomainNameInput").value.trim();
    var motd = document.getElementById("motdInput").value.trim();
    //var natConfig = document.getElementById("natInput").value.trim();
    var poolName = document.getElementById("poolNameInput").value.trim();
    var dhcpRange = document.getElementById("dhcpRangeInput").value.trim();
    var dhcpDR = document.getElementById("dhcpDefaultRInput").value.trim();
    var specificIP = document.getElementById("specificIPInput").value.trim();
    var vlanNumber = document.getElementById("vlanNumberInput").value.trim();
    var vlanName = document.getElementById("vlanNameInput").value.trim();
    var vlanInterface = document.getElementById("vlanInterfaceInput").value.trim();
    var vlanAccess = document.getElementById("vlanAccessInput").value.trim();
    var vlanAccessVlan = document.getElementById("vlanAccessVlanInput").value.trim();
    var vlanTrunkAllowed = document.getElementById("vlanTrunkAllowedInput").value.trim();
    var noVlan = document.getElementById("noVlanInput").value.trim();
    var nativeVlan = document.getElementById("nativeVlanInput").value.trim();
    var poolNamev6 = document.getElementById("poolNamev6Input").value.trim();
    var addressP = document.getElementById("prefixInput").value.trim();
    var DNSv6 = document.getElementById("serverDNSInput").value.trim();

    var command = "";
    if (hostname !== "") {
        command += "hostname " + hostname + ", ";
    }
    if (ipDomainName !== "") {
        command += "ip domain name " + ipDomainName + ", ";
    }
    if (motd !== "") {
        command += "banner motd #" + motd + "#, ";
    }
    /*if (natConfig !== "") {
        command += "access-list 1 permit " + natConfig + ", ";
    }*/
    if (specificIP !== "") {
        command += "ip dhcp excluded-address " + specificIP + ", ";
    }
    if (poolName !== "" && dhcpRange !== "") {
        command += "ip dhcp pool " + poolName + ", network " + dhcpRange + ", default router " + dhcpDR;
    }
    if(poolNamev6 !== "") {
        command += "ipv6 unicast-routing, " + "ipv6 dhcp pool " + poolNamev6 + ", address prefix " + addressP + ", dns-server " + DNSv6 + ", ";
    }
    if (vlanNumber !== "") {
        command += "vlan " + vlanNumber + ", ";
    }
    if (vlanName !== "") {
        command += "name " + vlanName + ", ";
    }
    if (vlanInterface !== "" && vlanAccess !== "" && vlanAccessVlan !== "" && vlanTrunkAllowed !== "") {
        command += "interface range " + vlanInterface + ", switchport mode " + vlanAccess + ", switchport access vlan " + vlanAccessVlan + ", switchport trunk allowed vlan " + vlanTrunkAllowed + ", ";
    }
    if (noVlan !== "") {
        command += "no vlan " + noVlan + ", ";
    }
    if (nativeVlan !== "") {
        command += "switchport trunk native vlan " + nativeVlan + ", ";
    }
    if (command.endsWith(", ")) {
        command = command.slice(0, -2);
    }

    var configData = {
        ip: key,
        command: command
    };

    fetch("http://localhost:5000/send-config", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(configData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error al enviar la configuración:', error);
    });

    limpiarFormulario();
}

function toggleVLANFields() {
    var vlanFields = document.getElementById('vlanFields');
    if (vlanFields.style.display === 'none') {
        vlanFields.style.display = 'block';
    } else {
        vlanFields.style.display = 'none';
    }
}

function toggleNATFields() {
    var natFields = document.getElementById('natFields');
    if (natFields.style.display === 'none') {
        natFields.style.display = 'block';
    } else {
        natFields.style.display = 'none';
    }
}

function toggleDHCPFields() {
    var dhcpFields = document.getElementById('dhcpFields');
    if (dhcpFields.style.display === 'none') {
        dhcpFields.style.display = 'block';
    } else {
        dhcpFields.style.display = 'none';
    }
}

function toggleDHCPv6Fields_se() {
    var dhcpv6Fields_se = document.getElementById('dhcpv6Fields-se');
    if (dhcpv6Fields_se.style.display === 'none') {
        dhcpv6Fields_se.style.display = 'block';
    } else {
        dhcpv6Fields_se.style.display = 'none';
    }
}

function toggleDHCPv6Fields() {
    var dhcpv6Fields = document.getElementById('dhcpv6Fields');
    if (dhcpv6Fields.style.display === 'none') {
        dhcpv6Fields.style.display = 'block';
    } else {
        dhcpv6Fields.style.display = 'none';
    }
}

function closeDeviceInfo() {
    document.getElementById("deviceInfo").style.display = "none";
}

function closeRouterConfig() {
    document.getElementById("routerConfig").style.display = "none";
}

function closeSwitchConfig() {
    document.getElementById("switchConfig").style.display = "none";
}

function openTab(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

function applySwitchConfigurations() {
    var switchHostname = document.getElementById("switchHostnameInput").value.trim();
    var switchIpDomainName = document.getElementById("switchIPDomainNameInput").value.trim();
    var switchMotd = document.getElementById("switchMotdInput").value.trim();

    var switchCommand = "";

    if (switchHostname !== "") {
        switchCommand += "hostname " + switchHostname + ", ";
    }
    if (switchIpDomainName !== "") {
        switchCommand += "ip domain name " + switchIpDomainName + ", ";
    }
    if (switchMotd !== "") {
        switchCommand += "banner motd #" + switchMotd + "#, ";
    }

    var switchConfigData = {
        ip: key,
        command: switchCommand
    };

    fetch("http://localhost:5000/send-config", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(switchConfigData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error al enviar la configuración del switch:', error);
    });

    document.getElementById("switchConfigForm").reset();
}

function openSwitchConfigTab(evt, tabName) {
    var switchTabcontent = document.getElementsByClassName("switchTabcontent");
    for (var i = 0; i < switchTabcontent.length; i++) {
        switchTabcontent[i].style.display = "none";
    }

    var switchTablinks = document.getElementsByClassName("switchTablinks");
    for (var i = 0; i < switchTablinks.length; i++) {
        switchTablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}
