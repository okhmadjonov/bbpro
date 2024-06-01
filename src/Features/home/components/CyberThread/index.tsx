import styles from "./CyberThread.module.scss";
import { ct } from "@/Assets/Images/index";
import Image from "next/image";

const CyberThread = () => {
  return (
    <div className={styles.cyberthread}>
      <div className="container">
        <div className="container_top_padding">
          <div className={styles.cyberthread_inner}>
            <div className={styles.cyberthreadContent}>
              <div className={styles.cyberthreadLeft}>
                <div className={styles.cyberthreadLeftInner}>
                  <div className={styles.cyberthreadLeftTitle}>
                    <h3> TYPICAL CLIENT ENGAGEMENT PHASES</h3>
                  </div>
                  <div className={styles.cyberthreadLeftSubTitle}>
                    <h4>INITIAL CLIENT SCOPING & DATA EXCHANGE</h4>
                    <p>
                      Our cyber threat intelligence services team will discuss
                      your catalyst event(s) and key investigative and
                      intelligence priorities. At the close of this discussion,
                      we’ll know if we can add value through an ongoing
                      relationship.
                    </p>
                  </div>
                  <div className={styles.cyberthreadLeftSubTitle}>
                    <h4>INVESTIGATION PHASE</h4>
                    <p>
                      We dig deep into the circumstances of your cyber threat
                      and investigate to enrich the data and provide evidence
                      that delivers on your intelligence requirements.
                    </p>
                  </div>
                  <div className={styles.cyberthreadLeftSubTitle}>
                    <h4>CLIENT BRIEF AND INVESTIGATIVE REPORTS</h4>
                    <p>
                      You receive actionable findings from the investigation:{" "}
                      <br />
                    </p>
                    <ul>
                      <li>Adversary/target information</li>
                      <li>
                        The actor’s or group’s tactics, techniques, and
                        procedures (TTPs)
                      </li>
                      <li>
                        The infrastructure associated with the actor or group
                      </li>
                      <li>
                        Options for you, including ongoing monitoring of new
                        actor infrastructure.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.cyberthreadRight}>
                <Image src={ct} alt="CyberThread" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberThread;
